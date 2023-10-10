import { useState } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import Select from 'react-select'

import { Box, Button, Typography } from '@mui/material'
import TextField from '@mui/material/TextField/TextField'

import { StyledForm } from './form-styles'

type LanguageItem = {
  value: string
  label: string
}

type FormValues = {
  name: string
  phone: string
  email: string
  language: LanguageItem[]
}

const languages = [
  { value: 'Čeština', label: 'Čeština' },
  { value: 'Angličtina', label: 'Angličtina' },
  { value: 'Slovenština', label: 'Slovenština' },
]

const Form = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm<FormValues>({
    defaultValues: {
      name: '',
      phone: '',
      email: '',
    },
  })

  const [data, setData] = useState<FormValues>({
    name: '',
    phone: '',
    email: '',
    language: [{ value: '', label: '' }],
  })

  const onSubmit: SubmitHandler<FormValues> = (data: FormValues) => {
    setData(data)

    reset({
      name: '',
      language: [],
    })
  }

  const hasErrors = Boolean(errors.name || errors.phone || errors.email)

  return (
    <StyledForm>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box className="form-container">
          <TextField
            className="input-field"
            label="name"
            {...register('name', {
              minLength: {
                value: 3,
                message: 'Name should be at least 3 characters',
              },
              maxLength: {
                value: 10,
                message: 'Name should be at most 10 characters',
              },
            })}
          />
          {errors.name && <p className="error-msg">{errors.name.message}</p>}

          <TextField
            className="input-field"
            label="phone"
            {...register('phone', {
              minLength: {
                value: 3,
                message: 'phone should be at least 3 characters',
              },
              maxLength: {
                value: 10,
                message: 'phone should be at most 10 characters',
              },
            })}
          />
          {errors.phone && <p className="error-msg">{errors.phone.message}</p>}

          <TextField
            className="input-field"
            label="email"
            {...register('email', {
              minLength: {
                value: 3,
                message: 'email should be at least 3 characters',
              },
              maxLength: {
                value: 10,
                message: 'email should be at most 10 characters',
              },
            })}
          />
          {errors.email && <p className="error-msg">{errors.email.message}</p>}

          <Controller
            name="language"
            control={control}
            rules={{ required: true }}
            render={({ field }) => <Select className="input-field" {...field} options={languages} />}
          />

          <Button type="submit" className="submit" variant="contained" size="large" disabled={hasErrors}>
            Submit
          </Button>

          <Typography className="normal-text">Data: {JSON.stringify(data)}</Typography>
        </Box>
      </form>
    </StyledForm>
  )
}

export default Form
