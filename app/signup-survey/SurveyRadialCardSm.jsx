"use client"
import { RadioGroup } from '@headlessui/react';
import { useState } from 'react';

function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
}

export default function SurveyRadialCardSm({ title, options, value, onChange }) {
    console.log(onChange)
    const [selectedValue, setSelectedValue] = useState(value);
    return (
        <div>
            <div className="flex items-center justify-between">
                <h2 className="text-sm font-medium leading-6 text-gray-900">{title}</h2>
            </div>

            <RadioGroup className="mt-2" value={selectedValue} onChange={setSelectedValue}>
                <RadioGroup.Label className="sr-only">Choose a memory option</RadioGroup.Label>
                <div className="grid grid-cols-3 gap-3 sm:grid-cols-6">
                    {options.map((option) => (
                        <RadioGroup.Option
                            key={option.id}
                            value={option}
                            className={({ active, checked }) =>
                                classNames(
                                    active ? 'ring-2 ring-indigo-600 ring-offset-2' : '',
                                    checked
                                        ? 'bg-indigo-600 text-white hover:bg-indigo-500'
                                        : 'ring-1 ring-inset ring-gray-300 bg-white text-gray-900 hover:bg-gray-50',
                                    'flex items-center justify-center rounded-md py-3 px-3 text-sm font-semibold uppercase sm:flex-1'
                                )
                            }
                        >
                            <RadioGroup.Label as="span">{option.name}</RadioGroup.Label>
                        </RadioGroup.Option>
                    ))}
                </div>
            </RadioGroup>
        </div>
    );
}
