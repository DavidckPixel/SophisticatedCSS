import { Metadata } from './Database';

export interface Type {
    primary: boolean,
    sqlType: (metadata: Metadata[]) => string,
    sqlColumn: (field: string, metadata: Metadata[]) => string,
    sqlConstraint: (field: string, table: string, metadata: Metadata[]) => string[],
}

export interface NullableType {
    nullable: boolean
}

export type StringOptions = NullableType;

export type StringType = Type & StringOptions;

export function String(options: Partial<StringOptions> = {}): StringType {
    let nullable = options.nullable ?? false;
    let sqlType = `TEXT ${nullable ? 'DEFAULT NULL' : 'NOT NULL'}`;

    return {
        nullable: nullable,
        primary: false,
        sqlType: (_) => sqlType,
        sqlColumn: (field, _) => `${field} ${sqlType}`,
        sqlConstraint: (_field, _table, _metadata) => [],
    };
}

export interface ForeignKeyOptions<Entity> extends Partial<NullableType> {
    entity: { new(...args: any): Entity }
}

export interface ForeignKeyType extends Type, NullableType {
    table: string
}

export function Foreign<T>(options: ForeignKeyOptions<T>): ForeignKeyType {
    let nullable = options.nullable ?? false;
    let fkTable = options.entity.name; 

    const findForeign = (table: string, metadata: Metadata[]): Metadata => {
        const foreign = metadata.find(x => x.table === table);
        if (!foreign) {
            throw new Error(`Entity '${table}' is not registered.`);
        }
        if (foreign.pk.length != 1) {
            throw new Error('Only tables with a single primary key are supported');
        }
        return foreign;
    }

    return {
        table: fkTable,
        nullable: nullable,
        primary: false,
        sqlType: (metadata) => {
            const foreign = findForeign(fkTable, metadata);
            const fkField = foreign.pk[0];
            const fkMeta = foreign.fields[fkField];
            return fkMeta.sqlType(metadata);
        },
        sqlColumn: (field, metadata) => {
            const foreign = findForeign(fkTable, metadata);
            const fkField = foreign.pk[0];
            const fkMeta = foreign.fields[fkField];
            return `${field} ${fkMeta.sqlType(metadata)}`;
        },
        sqlConstraint: (field, table, metadata) => {
            const foreign = findForeign(fkTable, metadata);
            const fkField = foreign.pk[0];
            return [`CONSTRAINT ${table}_fk_${fkTable} FOREIGN KEY (${field}) REFERENCES ${fkTable}(${fkField})`];
        }
    };
}

export function Primary(type: Type): Type {
    return {
        ...type,
        primary: true
    };
}