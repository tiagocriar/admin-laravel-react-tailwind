import Authenticated from "@/Layouts/AuthenticatedLayout";
import Breadcrumb from "@/Components/Breadcrumb";
import Pagination from "@/Components/Pagination";

import FlashMessage from "@/Components/FlashMessage";

const Categorias = ({ categorias }) => {
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
                                    Categoria
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {categorias.data && categorias.data.length > 0 ? (
                                categorias.data.map((categoria, index) => (
                                    <tr key={index}>
                                        <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                                            <h5 className="font-medium text-black dark:text-white">
                                                {categoria.title}
                                            </h5>
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
                    <Pagination paginator={categorias} />
                </div>
            </div>
        </Authenticated>
    );
};

export default Categorias;
