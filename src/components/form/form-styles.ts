import { Box } from '@mui/material'
import styled from 'styled-components'

export const StyledForm = styled(Box)`
  background-color: #ffffff;
  width: 75%;
  border-radius: 8px;
  padding: 48px;

  .form-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    word-wrap: break-word;
  }

  .input-field {
    width: 100%;
    margin-bottom: 24px;
  }

  .input-field input {
    color: #4b5a68;
  }

  .select-field {
    margin-bottom: 24px;
  }

  .submit {
    text-transform: Capitalize;
    align-self: flex-end;
    color: #ffffff;
    background-color: #cb605e;

    &:hover {
      background-color: #cb605e;
    }
  }

  .normal-text {
    margin-top: 48px;
    max-width: 100%;
  }
`
