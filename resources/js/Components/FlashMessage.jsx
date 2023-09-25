import { usePage } from '@inertiajs/react';
import { BsFillCheckCircleFill, BsFillXCircleFill } from "react-icons/bs";
import { useState, useEffect } from 'react';

export default function FlashMessage() {
    const { flash } = usePage().props;

    const VISIBLE_TIME = 5 * 1000;
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        updateVisible();
    }, [flash]);

    const updateVisible = () => {
        if (flash?.success || flash?.error) {
            setIsVisible(true);

            const timer = setTimeout(() => {
                setIsVisible(false);
            }, VISIBLE_TIME);

            return () => {
                clearTimeout(timer);
            };
        }
    }

    return (
        <div className={`flex-grow ${isVisible ? '' : 'hidden'}`}>
            {flash?.success && (
                <div className="bg-green-200 text-green-800 p-2 mb-4 rounded flex items-center">
                    <BsFillCheckCircleFill className="mr-1 inline" />{flash.success}
                </div>
            )}
            {flash?.error && (
                <div className="bg-red-200 text-red-800 p-2 mb-4 rounded flex items-center">
                    <BsFillXCircleFill className="mr-1 inline" /> {flash.error}
                </div>
            )}
        </div>
    );
}
