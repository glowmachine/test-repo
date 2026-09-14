import { LegislatorCurrentSchema } from "../../types/LegislatorCurrentSchema";
import { LegislatorDistrictOfficeSchema } from "../../types/LegislatorDistrictOfficeSchema";
import { LegislatorSocialMediaSchema } from "../../types/LegislatorSocialMediaSchema";
import { walkZodSchema, type YamlLine } from "../../util/walkZodSchema";
import z from "zod";

function getSourceFilename(schema: z.ZodObject): string {
    switch (schema) {
        case LegislatorCurrentSchema:
            return 'legislators-current.yaml'
        case LegislatorSocialMediaSchema:
            return 'legislators-social-media.yaml'
        case LegislatorDistrictOfficeSchema:
            return 'legislators-district-offices.yaml'
        default:
            return ''
    }
}

function isDateKey(str: string | undefined): boolean {
    return (str === 'birthday' || str === 'start' || str === 'end');
}
const INDENT = '\u00A0'; //non-breaking space
const DASH = '- ';

const buildYamlString = (line: YamlLine): string => {
    let output = '';

    const isFirstObjectInArray =
        line.isFirst && line.currentType === 'object' &&
        (line.parentType === undefined || line.parentType === 'array');
    const isPrimitiveInArray =
        line.currentType === 'primative' && line.parentType === 'array';
    const isFirstPrimitiveInObjectOfArray =
        line.isFirst && line.currentType === 'primative' &&
        line.parentType === 'object' && line.withinArray;

    if (isFirstObjectInArray) {
        output += DASH;
    } else if (isFirstPrimitiveInObjectOfArray) {
        output += INDENT.repeat(line.keyPath.length) + DASH;
    } else {
        output += INDENT.repeat(2 * line.keyPath.length);
    }

    if (isPrimitiveInArray) {
        output += DASH;
    }

    if (line.parentType !== 'array') {
        output += `${line.keyPath.at(-1)}: `;
    }
    if (line.displayValue) {
        output += isDateKey(line.keyPath.at(-1))
            ? `'${line.displayValue}'`
            : line.displayValue;
    }
    return output;
};

export function renderLegislatorData<T extends z.ZodObject>(schema: T, data: z.infer<T> | undefined) {
    const lines: YamlLine[] = [];
    walkZodSchema({
        parentSchema: undefined, currentSchema: schema,
        keyPath: [], data: data, yamlOutput: lines, isFirst: true
    });
    return (
        <>
            <p className='pb-5'>
                <a href='https://github.com/unitedstates/congress-legislators#overview'
                    target='_blank' rel='noopener noreferrer'
                    className='underline hover:text-red-500'>
                    {getSourceFilename(schema)}
                </a>
            </p>
            <ul>{lines.map((line, index) =>
                //lines will not change, stable index
                <li className={`${(line.isEmpty) ? 'text-zinc-400' : ''}`}
                    key={index}>
                    {buildYamlString(line)}
                </li>
            )}
            </ul>
        </>
    )
}