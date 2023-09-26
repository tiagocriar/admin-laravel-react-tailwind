import React from "react";
import { router } from "@inertiajs/react";

export default function Pagination({ paginator }) {
    const { current_page, last_page, total, from, to } = paginator;

    const hasMorePages = () => {
        return current_page < last_page;
    }

    const onPageChange = page => {
        router.visit(route(route().current(), {page}));
    }

    const pageNumbers = [];

    for (let i = 1; i <= last_page; i++) {
        pageNumbers.push(i);
    }

    return (
        <nav
            role="navigation"
            aria-label="Paginação"
            className="flex items-center justify-between"
        >
            <div className="flex justify-between flex-1 sm:hidden">
                {current_page === 1 ? (
                    <span className="relative inline-flex items-center px-4 py-2 text-sm font-medium text-gray-500 bg-white border border-slate-300 cursor-default leading-5 rounded-md">
                        Anterior
                    </span>
                ) : (
                    <button
                        onClick={() => onPageChange(current_page - 1)}
                        className="relative inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-slate-300 leading-5 rounded-md hover:text-gray-500 focus:outline-none focus:ring ring-gray-300 focus:border-blue-300 active:bg-gray-100 active:text-gray-700 transition ease-in-out duration-150"
                    >
                        Anterior
                    </button>
                )}

                {hasMorePages ? (
                    <button
                        onClick={() => onPageChange(current_page + 1)}
                        className="relative inline-flex items-center px-4 py-2 ml-3 text-sm font-medium text-gray-700 bg-white border border-slate-300 leading-5 rounded-md hover:text-gray-500 focus:outline-none focus:ring ring-gray-300 focus:border-blue-300 active:bg-gray-100 active:text-gray-700 transition ease-in-out duration-150"
                    >
                        Próxima
                    </button>
                ) : (
                    <span className="relative inline-flex items-center px-4 py-2 ml-3 text-sm font-medium text-gray-500 bg-white border border-slate-300 cursor-default leading-5 rounded-md">
                        Próxima
                    </span>
                )}
            </div>

            <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                <div>
                    <p className="text-sm text-gray-700 leading-5">
                        Mostrando{" "}
                        {total > 0 ? (
                            <span className="font-medium">{from}</span>
                        ) : (
                            total
                        )}{" "}
                        a{" "}
                        {total > 0 ? (
                            <span className="font-medium">{to}</span>
                        ) : (
                            total
                        )}{" "}
                        de <span className="font-medium">{total}</span>{" "}
                        resultados
                    </p>
                </div>

                <div>
                    <span className="relative z-0 inline-flex shadow-sm rounded-md">
                        {current_page === 1 ? (
                            <span aria-disabled="true" aria-label="Anterior">
                                <span
                                    className="relative inline-flex items-center px-2 py-2 text-sm font-medium text-gray-500 bg-white border border-slate-300 cursor-default rounded-l-md leading-5"
                                    aria-hidden="true"
                                >
                                    &laquo;
                                </span>
                            </span>
                        ) : (
                            <button
                                onClick={() => onPageChange(1)}
                                className="relative inline-flex items-center px-2 py-2 text-sm font-medium text-gray-500 bg-white border border-slate-300 rounded-l-md leading-5 hover:text-gray-400 focus:z-10 focus:outline-none focus:ring ring-gray-300 focus:border-blue-300 active:bg-gray-100 active:text-gray-500 transition ease-in-out duration-150"
                                aria-label="Primeira página"
                            >
                                &laquo;
                            </button>
                        )}

                        {pageNumbers.map((page) => (
                            <button
                                key={page}
                                onClick={() => onPageChange(page)}
                                className={`relative inline-flex items-center px-4 py-2 -ml-px text-sm font-medium text-gray-700 bg-white border border-slate-300 leading-5 ${
                                    current_page === page
                                        ? "text-blue-500"
                                        : "hover:text-gray-500"
                                } focus:z-10 focus:outline-none focus:ring ring-gray-300 focus:border-blue-300 active:bg-gray-100 active:text-gray-700 transition ease-in-out duration-150`}
                                aria-label={`Ir para a página ${page}`}
                            >
                                {page}
                            </button>
                        ))}

                        {current_page === last_page ? (
                            <span aria-disabled="true" aria-label="Próxima">
                                <span
                                    className="relative inline-flex items-center px-2 py-2 -ml-px text-sm font-medium text-gray-500 bg-white border border-slate-300 cursor-default rounded-r-md leading-5"
                                    aria-hidden="true"
                                >
                                    &raquo;
                                </span>
                            </span>
                        ) : (
                            <button
                                onClick={() => onPageChange(last_page)}
                                className="relative inline-flex items-center px-2 py-2 -ml-px text-sm font-medium text-gray-500 bg-white border border-slate-300 rounded-r-md leading-5 hover:text-gray-400 focus:z-10 focus:outline-none focus:ring ring-gray-300 focus:border-blue-300 active:bg-gray-100 active:text-gray-500 transition ease-in-out duration-150"
                                aria-label="Última página"
                            >
                                &raquo;
                            </button>
                        )}
                    </span>
                </div>
            </div>
        </nav>
    );
}
