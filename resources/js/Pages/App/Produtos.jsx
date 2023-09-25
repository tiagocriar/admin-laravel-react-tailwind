import Authenticated from "@/Layouts/AuthenticatedLayout";
import Breadcrumb from "@/Components/Breadcrumb";
import Pagination from "@/Components/Pagination";

import FlashMessage from "@/Components/FlashMessage";

const Produtos = ({ produtos }) => {

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
                                    Produto
                                </th>
                                <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                                    Categoria
                                </th>
                                <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                                    Marca
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {produtos.data && produtos.data.length > 0 ? (
                                produtos.data.map((produto, index) => (
                                    <tr key={index}>
                                        <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                                            <h5 className="font-medium text-black dark:text-white">
                                                {produto.title}
                                            </h5>
                                        </td>
                                        <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                            <p className="inline-flex rounded-full bg-slate-500 bg-opacity-10 py-1 px-3 text-sm font-medium text-sky-600">
                                                {produto.categoria?.title}
                                            </p>
                                        </td>
                                        <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                            <p className="inline-flex rounded-full bg-slate-500 bg-opacity-10 py-1 px-3 text-sm font-medium text-sky-600">
                                                {produto.marca?.title}
                                            </p>
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
                    <Pagination paginator={produtos} />
                </div>
            </div>
        </Authenticated>
    );
};

export default Produtos;
