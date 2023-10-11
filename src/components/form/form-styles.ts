import { Box } from '@mui/material'
import styled from 'styled-components'

export const StyledForm = styled(Box)`
  background-color: #ffffff;
  width: 75%;
  border-radius: 8px;
  padding: 40px;

  .form-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    word-wrap: break-word;
  }

  .input-field {
    width: 100%;
    margin: 8px 0;
  }

  .submit {
    margin-top: 40px;
  }

  .normal-text {
    margin-top: 40px;
    max-width: 100%;
  }
`
