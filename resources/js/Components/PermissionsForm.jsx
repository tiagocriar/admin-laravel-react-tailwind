import { useForm, FormProvider } from "react-hook-form";
import { router } from "@inertiajs/react";
import { BsSave } from "react-icons/bs";

import PermissionsField from "./PermissionsFields";

function PermissionsForm({ onSubmit, currentUser, currentUser: { permissions } }) {
    const { control, handleSubmit } = useForm();

    const submitForm = (data) => {
        router.post(route("permissions.store"), {
            idUser: currentUser.id,
            ...data
        }, {
            onSuccess: () => onSubmit()
        });
    };

    return (
        <div className="py-3 px-2">
            <FormProvider control={control}>
                <form onSubmit={handleSubmit(submitForm)}>
                    <span className="mb-3 block text-black dark:text-white">
                        Editar Permissão do usuário
                    </span>
                    <PermissionsField permissions={permissions} />

                    <div className="flex justify-end mt-5">
                        <button className="flex items-center justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:bg-opacity-90">
                            Salvar <BsSave className="ml-1" />
                        </button>
                    </div>
                </form>
            </FormProvider>
        </div>
    );
}

export default PermissionsForm;
