import { useEffect, useState } from "react";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import Breadcrumb from "@/Components/Breadcrumb";
import { router, usePage } from "@inertiajs/react";
import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { FaUserGear } from "react-icons/fa6";
import { BsSave } from "react-icons/bs";

import InputError from "@/Components/InputError";
import FlashMessage from "@/Components/FlashMessage";
import PermissionsFields from "@/Components/PermissionsFields";

function UserForm({ user, permissions }) {
    const { errors: pageErrors } = usePage().props;
    const [showPermissions, setShowPermissions] = useState(false);
    const [changePassword, setChangePassword] = useState(true);

    const schema = yup.object().shape({
        name: yup.string().required("O nome é obrigatório"),
        email: yup
            .string()
            .email("Insira um email válido")
            .required("O email é obrigatório"),
        role: yup
            .string()
            .oneOf(["ADMIN", "DEFAULT"], "Selecione um nível de acesso válido")
            .required("O nível de acesso é obrigatório"),
        password: yup.lazy((value) =>
            changePassword
                ? yup
                      .string()
                      .min(8, "A senha deve ter pelo menos 8 caracteres")
                      .required("A senha é obrigatória")
                : yup.string()
        ),
        confirmPassword: yup.lazy((value) =>
            changePassword
                ? yup
                      .string()
                      .oneOf([yup.ref("password")], "As senhas devem coincidir")
                      .required("A confirmação de senha é obrigatória")
                : yup.string()
        ),
    });

    const {
        control,
        watch,
        getValues,
        register,
        handleSubmit,
        setError,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });

    const handleServerValidationsErros = (errors) => {
        for (const input in errors) {
            setError(input, {
                type: "manual",
                message: errors[input],
            });
        }
    };

    useEffect(() => {
        const role = getValues("role");
        updateShowPermission(role);

        if (user?.id) {
            setChangePassword(false);
        }
    }, []);

    useEffect(() => {
        if (pageErrors.storeUser) {
            handleServerValidationsErros(pageErrors.storeUser);
        }
    }, [pageErrors.storeUser]);

    useEffect(() => {
        const role = getValues("role");
        updateShowPermission(role);
    }, [watch("role")]);

    const updateShowPermission = (role) => {
        if (role === "ADMIN") {
            setShowPermissions(false);
        } else {
            setShowPermissions(true);
        }
    };

    const updateChangePassword = () => {
        if (changePassword) {
            setChangePassword(false);
        } else {
            setChangePassword(true);
        }
    };

    const onSubmit = (data) => {
        router.post(route("users.store"), {
            idUser: user?.id,
            changePassword: changePassword,
            ...data
        }, {
            errorBag: "storeUser",
        });
    };

    return (
        <Authenticated>
            <Breadcrumb />

            <div className="rounded-md border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                <FormProvider control={control}>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="flex flex-col gap-5.5 p-6.5">
                            <FlashMessage />
                            <div>
                                <label className="mb-3 block text-black dark:text-white">
                                    Nome:
                                </label>
                                <input
                                    {...register("name")}
                                    defaultValue={user?.name || null}
                                    type="text"
                                    placeholder="Insira o nome de usuário"
                                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                />
                                {errors.name && (
                                    <InputError message={errors.name.message} />
                                )}
                            </div>

                            <div>
                                <label className="mb-3 block text-black dark:text-white">
                                    Email:
                                </label>
                                <input
                                    {...register("email")}
                                    defaultValue={user?.email || null}
                                    type="email"
                                    placeholder="Insira o email de usuário"
                                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                />
                                {errors.email && (
                                    <InputError
                                        message={errors.email.message}
                                    />
                                )}
                            </div>

                            <div>
                                <label className="mb-3 block text-black dark:text-white">
                                    Nível de acesso:
                                </label>
                                <div className="relative z-20 bg-white dark:bg-form-input">
                                    <span className="absolute top-1/2 left-4 z-30 -translate-y-1/2">
                                        <FaUserGear />
                                    </span>
                                    <select
                                        {...register("role")}
                                        defaultValue={user?.role || null}
                                        className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-12 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input"
                                    >
                                        <option value="DEFAULT">Comum</option>
                                        <option value="ADMIN">
                                            Administrador
                                        </option>
                                    </select>
                                    {errors.role && (
                                        <InputError
                                            message={errors.role.message}
                                        />
                                    )}
                                </div>
                            </div>

                            {!changePassword && (
                                <div className="flex justify-end">
                                    <button
                                        type="button"
                                        onClick={updateChangePassword}
                                        className="flex items-center justify-center rounded bg-graydark py-2 px-6 font-medium text-gray hover:bg-opacity-90"
                                    >
                                        Alterar Senha
                                    </button>
                                </div>
                            )}

                            {changePassword && (
                                <div>
                                    <label className="mb-3 block text-black dark:text-white">
                                        Senha:
                                    </label>
                                    <input
                                        {...register("password")}
                                        type="password"
                                        placeholder="Insira a senha de acesso"
                                        className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                    />
                                    {errors.password && (
                                        <InputError
                                            message={errors.password.message}
                                        />
                                    )}
                                </div>
                            )}

                            {changePassword && (
                                <div>
                                    <label className="mb-3 block text-black dark:text-white">
                                        Confirmação de senha:
                                    </label>
                                    <input
                                        {...register("confirmPassword")}
                                        type="password"
                                        placeholder="Insira a senha novamente"
                                        className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                    />
                                    {errors.confirmPassword && (
                                        <InputError
                                            message={
                                                errors.confirmPassword.message
                                            }
                                        />
                                    )}
                                </div>
                            )}

                            <div
                                className={`${showPermissions ? "" : "hidden"}`}
                            >
                                <span className="mb-3 block text-black dark:text-white">
                                    Permissões
                                </span>
                                <PermissionsFields permissions={permissions} />
                            </div>

                            <div className="flex justify-end">
                                <button className="flex items-center justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:bg-opacity-90">
                                    Salvar <BsSave className="ml-1" />
                                </button>
                            </div>
                        </div>
                    </form>
                </FormProvider>
            </div>
        </Authenticated>
    );
}

export default UserForm;
