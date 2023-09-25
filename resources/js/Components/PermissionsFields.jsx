import Checkbox from "./Checkbox";
import { useFormContext, Controller } from "react-hook-form";

function PermissionsField({ permissions }) {
    const { control } = useFormContext();

    return (
        <div className="flex space-x-4">
            <label className="flex items-center">
                <Controller
                    name="permissions.PRODUTOS"
                    control={control}
                    defaultValue={permissions?.includes('PRODUTOS')}
                    render={({ field }) => (
                        <Checkbox
                            name={field.name}
                            checked={field.value || false}
                            onChange={(value) =>
                                field.onChange(value.target.checked)
                            }
                        />
                    )}
                />
                <span className="ml-2 text-sm text-gray-600">Produtos</span>
            </label>

            <label className="flex items-center">
                <Controller
                    name="permissions.CATEGORIAS"
                    control={control}
                    defaultValue={permissions?.includes('CATEGORIAS')}
                    render={({ field }) => (
                        <Checkbox
                            name={field.name}
                            checked={field.value || false}
                            onChange={(value) =>
                                field.onChange(value.target.checked)
                            }
                        />
                    )}
                />
                <span className="ml-2 text-sm text-gray-600">Categorias</span>
            </label>

            <label className="flex items-center">
                <Controller
                    name="permissions.MARCAS"
                    control={control}
                    defaultValue={permissions?.includes('MARCAS')}
                    render={({ field }) => (
                        <Checkbox
                            name={field.name}
                            checked={field.value || false}
                            onChange={(value) =>
                                field.onChange(value.target.checked)
                            }
                        />
                    )}
                />
                <span className="ml-2 text-sm text-gray-600">Marcas</span>
            </label>
        </div>
    );
}

export default PermissionsField;
