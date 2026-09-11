import z from "zod";

//Only unwraps ZodOptional, ZodNullable, and ZodNullish
function unwrap(schema: z.ZodType): z.ZodType {
    let currentSchema = schema;
    while (currentSchema instanceof z.ZodOptional || currentSchema instanceof z.ZodNullable) {
        currentSchema = (currentSchema as any).unwrap();
    }
    return currentSchema;
}

export type YamlLine = {
    parentType?: string, currentType?: string,
    displayValue?: string,
    keyPath: string[], isFirst?: boolean, isEmpty?: boolean, withinArray?: boolean,
}

type WalkZodSchemaProps = {
    parentSchema?: z.ZodType, currentSchema: z.ZodType,
    data: any, keyPath: string[],
    yamlOutput: YamlLine[], isFirst?: boolean, withinArray?: boolean
}
export function walkZodSchema({
    parentSchema, currentSchema,
    data, keyPath, yamlOutput,
    isFirst, withinArray }: WalkZodSchemaProps
): void {
    if (data === null) return;

    const unwrappedCurrentSchema = unwrap(currentSchema);

    if (unwrappedCurrentSchema instanceof z.ZodArray) {
        if ((parentSchema instanceof z.ZodObject)) {
            yamlOutput.push({
                parentType: parentSchema.type, currentType: unwrappedCurrentSchema.type,
                keyPath, isEmpty: !data
            });
        }

        const itemSchema = unwrappedCurrentSchema.unwrap() //unwraps ZodArray;
        if (data) {
            //data exists
            data.forEach((item: any, index: number) => {
                walkZodSchema({
                    parentSchema: unwrappedCurrentSchema, currentSchema: itemSchema as z.ZodAny,
                    data: item, keyPath: keyPath, yamlOutput, isFirst: index === 0, withinArray: true
                });
            });
        } else if (keyPath.length === 1 && itemSchema instanceof z.ZodObject) {
            //data doesn't exist, but this is a top-level property array of objects
            //so add undefined key of one placeholder object
            walkZodSchema({
                parentSchema: unwrappedCurrentSchema, currentSchema: itemSchema,
                data: {}, keyPath: keyPath, yamlOutput, withinArray: true
            });
        }

    }
    else if (unwrappedCurrentSchema instanceof z.ZodObject) {
        if (parentSchema instanceof z.ZodObject) {
            yamlOutput.push({
                currentType: unwrappedCurrentSchema.type, keyPath,
                isFirst, isEmpty: !data
            });
        }
        Object.keys(unwrappedCurrentSchema.shape).forEach((key, index) => {
            const propSchema = unwrappedCurrentSchema.shape[key];
            const unwrappedPropSchema = unwrap(propSchema);
            const propValue = data ? data[key] : undefined;
            const currentKeyPath = [...keyPath, key];
            walkZodSchema({
                parentSchema: unwrappedCurrentSchema, currentSchema: unwrappedPropSchema,
                data: propValue, keyPath: currentKeyPath, yamlOutput,
                isFirst: index === 0, withinArray
            });
        });
    }
    else { //currentSchema is a primative
        yamlOutput.push({
            isFirst, parentType: parentSchema?.type, currentType: 'primative',
            keyPath: keyPath, displayValue: data, withinArray, isEmpty: !data
        });
    }
}