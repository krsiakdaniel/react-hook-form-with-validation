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
  }

  const hasErrors = Boolean(errors.name || errors.phone || errors.email)
  const showData = data.email !== '' && data.name !== '' && data.phone !== ''
  const formData = JSON.stringify(data)

  return (
    <StyledForm>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box className="form-container">
          <TextField
            className="input-field"
            label={`Jméno ${errors.name ? '*' : ''}`}
            error={!!errors.name}
            helperText={errors.name && `${errors.name.message}`}
            {...register('name', {
              required: 'Pole "Jméno" je povinné',
              minLength: {
                value: 3,
                message: 'Name should be at least 3 characters',
              },
              maxLength: {
                value: 64,
                message: 'Name should be at most 64 characters',
              },
            })}
          />

          <TextField
            className="input-field"
            label={`Telefon ${errors.name ? '*' : ''}`}
            error={!!errors.phone}
            helperText={errors.phone && `${errors.phone.message}`}
            {...register('phone', {
              required: 'Pole "Telefon" je povinné',
              minLength: {
                value: 3,
                message: 'Phone should be at least 3 characters',
              },
              maxLength: {
                value: 13,
                message: 'Phone should be at most 13 characters',
              },
            })}
          />

          <TextField
            className="input-field"
            label={`E-mail ${errors.name ? '*' : ''}`}
            error={!!errors.email}
            helperText={errors.email && `${errors.email.message}`}
            {...register('email', {
              required: 'Pole "E-mail" je povinné',
              minLength: {
                value: 3,
                message: 'E-mail should be at least 3 characters',
              },
              maxLength: {
                value: 64,
                message: 'E-mail should be at most 64 characters',
              },
            })}
          />

          <Controller
            name="language"
            control={control}
            rules={{ required: true }}
            render={({ field }) => <Select className="input-field" {...field} options={languages} />}
          />

          <Button type="submit" className="submit" variant="contained" size="large" disabled={hasErrors}>
            Submit
          </Button>

          {showData && <Typography className="normal-text">Form data: {formData}</Typography>}
        </Box>
      </form>
    </StyledForm>
  )
}

export default Form
