import { Fragment, useState } from "react";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import Breadcrumb from "@/Components/Breadcrumb";
import { router, Link } from "@inertiajs/react";
import { FaPenToSquare, FaUserGear, FaTrash } from "react-icons/fa6";
import Swal from "sweetalert2";

import Pagination from "@/Components/Pagination";
import FlashMessage from "@/Components/FlashMessage";
import Modal from "@/Components/Modal";
import PermissionsForm from "@/Components/PermissionsForm";

const ListUsers = ({ users }) => {
    const [modalIsOpen, setIsOpen] = useState(false);
    const [currentDataModal, setCurrentDataModal] = useState();

    function openModal(user) {
        setCurrentDataModal(user);
        setIsOpen(true);
    }

    function closeModal() {
        setIsOpen(false);
    }

    const handleDeleteUser = (idUser) => {
        Swal.fire({
            title: "Deseja excluir esse usuário?",
            showDenyButton: true,
            showCancelButton: false,
            confirmButtonText: "Sim, excluir",
            denyButtonText: "Cancelar",
        }).then((result) => {
            if (result.isConfirmed) {
                sendDeleteUser(idUser);
            }
        });
    };

    const sendDeleteUser = (idUser) => {
        router.delete(route("users.delete", { idUser }));
    };

    return (
        <Authenticated>
            <Breadcrumb />

            <div className="rounded-md border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
                <FlashMessage />
                <div className="max-w-full overflow-x-auto">
                    <table className="w-full table-auto">
                        <thead>
                            <tr className="bg-gray-2 text-left dark:bg-meta-4">
                                <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                                    Nome
                                </th>
                                <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                                    Email
                                </th>
                                <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                                    Nível
                                </th>
                                <th className="py-4 px-4 font-medium text-black dark:text-white">
                                    Menu
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.data && users.data.length > 0 ? (
                                users.data.map((user, index) => (
                                    <tr key={index}>
                                        <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                                            <h5 className="font-medium text-black dark:text-white">
                                                {user.name}
                                            </h5>
                                        </td>
                                        <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                            <p className="text-black dark:text-white">
                                                {user.email}
                                            </p>
                                        </td>
                                        <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                            <p className="inline-flex rounded-full bg-slate-500 bg-opacity-10 py-1 px-3 text-sm font-medium text-sky-600">
                                                {user.role}
                                            </p>
                                        </td>
                                        <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                            <div className="flex items-center space-x-3.5">
                                                <Link
                                                    href={route("users.edit", {
                                                        idUser: user.id,
                                                    })}
                                                >
                                                    <div className="relative group">
                                                        <button className="hover:text-primary">
                                                            <FaPenToSquare className="text-slate-600" />
                                                        </button>
                                                        <span className="pointer-events-none rounded-md px-2 bg-slate-800 z-50 text-white absolute -top-5 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-max opacity-0 transition-opacity group-hover:opacity-100">
                                                            Editar Usuário
                                                        </span>
                                                    </div>
                                                </Link>
                                                {user?.role === "DEFAULT" && (
                                                    <div className="relative group">
                                                        <button
                                                            onClick={() =>
                                                                openModal(user)
                                                            }
                                                            className="hover:text-primary"
                                                        >
                                                            <FaUserGear className="text-slate-600" />
                                                        </button>
                                                        <span className="pointer-events-none rounded-md px-2 bg-slate-800 z-50 text-white absolute -top-5 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-max opacity-0 transition-opacity group-hover:opacity-100">
                                                            Editar Permissões
                                                        </span>
                                                    </div>
                                                )}
                                                <div className="relative group">
                                                    <button
                                                        onClick={() =>
                                                            handleDeleteUser(
                                                                user.id
                                                            )
                                                        }
                                                        className="hover:text-primary"
                                                    >
                                                        <FaTrash className="text-slate-600" />
                                                    </button>
                                                    <span className="pointer-events-none rounded-md px-2 bg-slate-800 z-50 text-white absolute -top-5 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-max opacity-0 transition-opacity group-hover:opacity-100">
                                                        Excluir Usuário
                                                    </span>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td
                                        colSpan="4"
                                        className="text-center py-5"
                                    >
                                        Não há usuários para mostrar.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                <div className="my-3">
                    <Pagination paginator={users} />
                </div>
            </div>

            <Modal modalIsOpen={modalIsOpen} onRequestClose={closeModal}>
                <PermissionsForm currentUser={currentDataModal} onSubmit={closeModal} />
            </Modal>
        </Authenticated>
    );
};

export default ListUsers;
