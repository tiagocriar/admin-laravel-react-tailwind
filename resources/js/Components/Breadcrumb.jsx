import { usePage } from '@inertiajs/react';

const Breadcrumb = () => {
    const { pageName, paths } = usePage().props?.breadcrumb;

    return (
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-title-md2 font-semibold text-black dark:text-white">
            {pageName}
        </h2>

        <nav>
            <ol className="flex items-center gap-2">
                {
                    paths.map((path, index) => {
                        return (
                            <li key={index}>{path} /</li>
                        );
                    })
                }
                <li className="text-primary">{pageName}</li>
            </ol>
        </nav>
        </div>
    );
};

export default Breadcrumb;
