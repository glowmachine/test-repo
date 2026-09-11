import { walkZodSchema, type YamlLine } from "../../util/walkZodSchema";
import z from "zod";

// const styleHover = 'hover:bg-zinc-300 dark:hover:bg-zinc600 pr-5';

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

export function renderLegislatorData<T extends z.ZodType>(schema: T, data: z.infer<T> | undefined) {
    const lines: YamlLine[] = [];
    walkZodSchema({
        parentSchema: undefined, currentSchema: schema,
        keyPath: [], data: data, yamlOutput: lines, isFirst: true
    });
    return (
        <ul>{lines.map(line =>
            <li className={`${(line.isEmpty) ? 'text-zinc-400' : ''} `}>
                {buildYamlString(line)}
            </li>
        )}
        </ul>
    )
}