import { Box } from '@mui/material'
import styled from 'styled-components'

export const StyledForm = styled(Box)`
  max-height: 100vh;
  width: 50%;
  border-radius: 8px;
  background-color: #ffffff;
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
  }

  .error-msg {
    color: #f00;
  }
`
