import { IItem } from './index';
import React, { useEffect, useState } from 'react';

export function Keys(props: { initialData: IItem[]; sorting: 'ASC' | 'DESC' }) {
    useEffect(() => {
        if (props.sorting === 'DESC') {
            props.initialData.sort(sortAsc);
        } else {
            props.initialData.sort(sortDesc);
        }
    }, [props.initialData, props.sorting]);
    return (
        <div>
            <ol>
                {props.initialData.map((item) => {
                    return <ElementList key={item.id} item={item} />;
                })}
            </ol>
        </div>
    );
}

const ElementList = (props: { item: IItem }) => {
    const [isEdited, setIsEdited] = useState(false);
    const li = <li onClick={() => setIsEdited(true)}>{props.item.name}</li>;
    const input = (
        <input
            onKeyDown={(e) => onKeyDown(e, props.item, setIsEdited)}
            defaultValue={props.item.name}
        ></input>
    );
    return isEdited ? input : li;
};

const onKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    item: IItem,
    setIsEdited: setIsEditedFunction,
) => {
    if (e.key === 'Enter') {
        item.name = e.currentTarget.value;
        setIsEdited(false);
    } else if (e.key === 'Escape') {
        setIsEdited(false);
    }
};

function sortAsc(a: IItem, b: IItem): number {
    if (a.name.toLowerCase() < b.name.toLowerCase()) {
        return -1;
    } else if (a.name.toLowerCase() > b.name.toLowerCase()) {
        return 1;
    }
    return 0;
}

function sortDesc(a: IItem, b: IItem): number {
    return sortAsc(b, a);
}

type setIsEditedFunction = (flag: boolean) => void;
