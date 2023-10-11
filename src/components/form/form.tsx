import { useState } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'

import { Box, Button, FormControl, InputLabel, MenuItem, Typography } from '@mui/material'
import Select from '@mui/material/Select'
import TextField from '@mui/material/TextField/TextField'
import { styled } from '@mui/system'

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
  { value: 'cestina', label: 'Čeština' },
  { value: 'anglictina', label: 'Angličtina' },
  { value: 'slovenstina', label: 'Slovenština' },
]

const StyledWrapper = styled(Box)({
  backgroundColor: '#ffffff',
  width: '75%',
  maxWidth: '1024px',
  borderRadius: '8px',
  padding: '48px',
})

const StyledFormContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  wordWrap: 'break-word',
})

const StyledTextField = styled(TextField)({
  width: '100%',
  marginBottom: '24px',
})

const StyledButton = styled(Button)({
  textTransform: 'capitalize',
  alignSelf: 'flex-end',
  color: '#ffffff',
  backgroundColor: '#cb605e',

  '&:hover': {
    backgroundColor: '#cb605e',
  },
})

const StyledText = styled(Typography)({
  marginTop: '48px',
  maxWidth: '100%',
})

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
      language: [{ value: languages[0].value, label: languages[0].label }],
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
    <StyledWrapper>
      <form onSubmit={handleSubmit(onSubmit)}>
        <StyledFormContainer>
          <StyledTextField
            placeholder="Např.: Jan Novák"
            label={`Jméno ${errors.name ? '*' : ''}`}
            error={!!errors.name}
            helperText={errors.name && `${errors.name.message}`}
            {...register('name', {
              required: 'Pole "Jméno" je povinné',
              minLength: {
                value: 3,
                message: 'Jméno by mělo být minimálně 3 znaky dlouhé.',
              },
              maxLength: {
                value: 64,
                message: 'Jméno by mělo být maximálně 64 znaků dlouhé.',
              },
            })}
          />

          <StyledTextField
            placeholder="Např.: 608 123 456"
            label={`Telefon ${errors.name ? '*' : ''}`}
            error={!!errors.phone}
            helperText={errors.phone && `${errors.phone.message}`}
            {...register('phone', {
              required: 'Pole "Telefon" je povinné',
              pattern: {
                value: /^[0-9]*$/,
                message: 'Telefon může být pouze číslo.',
              },
              minLength: {
                value: 9,
                message: 'Telefon může být pouze číslo. Minimálně 9 znaků dlouhé.',
              },
              maxLength: {
                value: 13,
                message: 'Telefon může být pouze číslo. Maximálně 13 znaků dlouhé.',
              },
            })}
          />

          <StyledTextField
            placeholder="Např.: jan.novak@gmail.com"
            label={`E-mail ${errors.name ? '*' : ''}`}
            error={!!errors.email}
            helperText={errors.email && `${errors.email.message}`}
            {...register('email', {
              required: 'Pole "E-mail" je povinné',
              pattern: {
                value: /^([a-zA-Z0-9])+([a-zA-Z0-9\._-])*@([a-zA-Z0-9_-])+([a-zA-Z0-9\._-]+)+$/,
                message: 'E-mail musí obsahovat znak @ a domenu .cz, .com, .sk, ...',
              },
              minLength: {
                value: 7,
                message: 'E-mail musí obsahovat znak @ a být minimálně 7 znaků dlouhý.',
              },
              maxLength: {
                value: 64,
                message: 'E-mail musí obsahovat znak @ a být maximálně 64 znaků dlouhý.',
              },
            })}
          />

          <FormControl sx={{ marginTop: 1, marginBottom: 1, width: '100%' }}>
            <InputLabel id="type-label">Hlavní jazyk</InputLabel>
            <Controller
              control={control}
              name="language"
              render={({ field }) => (
                <Select
                  margin="dense"
                  {...field}
                  type="select"
                  labelId="type-label"
                  label="Hlavní jazyk"
                  sx={{ mb: '24px' }}
                >
                  {languages.map((language) => (
                    <MenuItem key={language.value} value={language.value}>
                      {language.label}
                    </MenuItem>
                  ))}
                </Select>
              )}
            />
          </FormControl>

          <StyledButton type="submit" variant="contained" size="large" disabled={hasErrors}>
            Submit
          </StyledButton>

          {showData && <StyledText>Form data: {formData}</StyledText>}
        </StyledFormContainer>
      </form>
    </StyledWrapper>
  )
}

export default Form
