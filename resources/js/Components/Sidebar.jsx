import React, { useEffect, useRef, useState } from "react";
import ApplicationLogo from "@/Components/ApplicationLogo";
import { BsPersonAdd, BsFillPersonLinesFill, BsBookmarksFill, BsBoxSeamFill } from "react-icons/bs";
import { FaSitemap } from "react-icons/fa";
import { Link, usePage } from "@inertiajs/react";

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
    const {
        props: {
            auth: { user, permissions },
        },
    } = usePage();

    const trigger = useRef(null);
    const sidebar = useRef(null);

    const storedSidebarExpanded = localStorage.getItem("sidebar-expanded");
    const [sidebarExpanded, setSidebarExpanded] = useState(
        storedSidebarExpanded === null
            ? false
            : storedSidebarExpanded === "true"
    );

    useEffect(() => {
        localStorage.setItem("sidebar-expanded", sidebarExpanded.toString());
        if (sidebarExpanded) {
            document.querySelector("body")?.classList.add("sidebar-expanded");
        } else {
            document
                .querySelector("body")
                ?.classList.remove("sidebar-expanded");
        }
    }, [sidebarExpanded]);

    return (
        <aside
            ref={sidebar}
            className={`absolute left-0 top-0 z-9999 flex h-screen w-72.5 flex-col overflow-y-hidden bg-black duration-300 ease-linear dark:bg-boxdark lg:static lg:translate-x-0 ${
                sidebarOpen ? "translate-x-0" : "-translate-x-full"
            }`}
        >
            {/* <!-- SIDEBAR HEADER --> */}
            <div className="flex items-center justify-between gap-2 px-6 py-5.5 lg:py-6.5">
                <a className="flex justify-center" to="/">
                    <ApplicationLogo className="block w-2/3" />
                </a>

                <button
                    ref={trigger}
                    onClick={() => setSidebarOpen(!sidebarOpen)}
                    aria-controls="sidebar"
                    aria-expanded={sidebarOpen}
                    className="block lg:hidden"
                >
                    <svg
                        className="fill-current"
                        width="20"
                        height="18"
                        viewBox="0 0 20 18"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M19 8.175H2.98748L9.36248 1.6875C9.69998 1.35 9.69998 0.825 9.36248 0.4875C9.02498 0.15 8.49998 0.15 8.16248 0.4875L0.399976 8.3625C0.0624756 8.7 0.0624756 9.225 0.399976 9.5625L8.16248 17.4375C8.31248 17.5875 8.53748 17.7 8.76248 17.7C8.98748 17.7 9.17498 17.625 9.36248 17.475C9.69998 17.1375 9.69998 16.6125 9.36248 16.275L3.02498 9.8625H19C19.45 9.8625 19.825 9.4875 19.825 9.0375C19.825 8.55 19.45 8.175 19 8.175Z"
                            fill=""
                        />
                    </svg>
                </button>
            </div>
            {/* <!-- SIDEBAR HEADER --> */}

            <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
                {/* <!-- Sidebar Menu --> */}
                <nav className="mt-4 py-4 px-4 lg:mt-3 lg:px-6">
                    {/* <!-- Menu Group --> */}
                    <div>
                        {user?.role === "ADMIN" && (
                            <h3 className="mb-4 ml-4 text-sm font-semibold text-bodydark2">
                                USUÁRIOS
                            </h3>
                        )}

                        {user?.role === "ADMIN" && (
                            <ul className="mb-6 flex flex-col gap-1.5">
                                <li>
                                    <Link
                                        href={route("users.create")}
                                        className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4
                            ${
                                route().current("users.create") &&
                                "bg-graydark dark:bg-meta-4"
                            }`}
                                    >
                                        <BsPersonAdd /> Criar Usuário
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href={route("users.index")}
                                        className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4
                            ${
                                route().current("users.index") &&
                                "bg-graydark dark:bg-meta-4"
                            }`}
                                    >
                                        <BsFillPersonLinesFill /> Listar
                                        Usuários
                                    </Link>
                                </li>
                            </ul>
                        )}

                        {user?.role === "DEFAULT" && (
                            <ul className="mb-6 flex flex-col gap-1.5">
                                <li className={`${permissions?.includes('PRODUTOS') ? '' : 'hidden'}`}>
                                    <Link
                                        href={route("produtos.index")}
                                        className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4
                            ${
                                route().current("produtos.index") &&
                                "bg-graydark dark:bg-meta-4"
                            }`}
                                    >
                                        <BsBoxSeamFill /> Produtos
                                    </Link>
                                </li>
                                <li className={`${permissions?.includes('MARCAS') ? '' : 'hidden'}`}>
                                    <Link
                                        href={route("marcas.index")}
                                        className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4
                            ${
                                route().current("marcas.index") &&
                                "bg-graydark dark:bg-meta-4"
                            }`}
                                    >
                                        <BsBookmarksFill /> Marcas
                                    </Link>
                                </li>
                                <li className={`${permissions?.includes('CATEGORIAS') ? '' : 'hidden'}`}>
                                    <Link
                                        href={route("categorias.index")}
                                        className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4
                            ${
                                route().current("categorias.index") &&
                                "bg-graydark dark:bg-meta-4"
                            }`}
                                    >
                                        <FaSitemap /> Categorias
                                    </Link>
                                </li>
                            </ul>
                        )}
                    </div>
                </nav>
                {/* <!-- Sidebar Menu --> */}
            </div>
        </aside>
    );
};

export default Sidebar;
