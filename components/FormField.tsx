import React from 'react'
import { FormControl, FormItem, FormLabel, FormMessage } from './ui/form'
import { Input } from './ui/input'
import { Control, Controller, FieldValues, Path } from 'react-hook-form'
interface FormFieldProps<T extends FieldValues>{//whatever we dynamically pass to it, it will take form of this generic 'T' Parameter
    control : Control<T>;
    name : Path<T>,
    label : string, 
    placeholder?: string, // ? means optional hai ye field
    type?: 'text' | 'email' | 'password' | 'file'
}
const FormField = <T extends FieldValues> ({control, name, label, placeholder, type = "text"} : FormFieldProps<T>) => (//FormFieldProps<T> -> T is generic parameter,  defualt type is text
   <Controller name = {name} control={control} render = {({field}) => 
        (<FormItem>
                <FormLabel className='label'>{label}</FormLabel>
                <FormControl>
                    <Input className='input' placeholder={placeholder} type={type} {...field} />
                </FormControl>
                <FormMessage />
        </FormItem>)}
    />
)

export default FormField
