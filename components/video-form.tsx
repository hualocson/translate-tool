import React from 'react'
import * as Form from '@radix-ui/react-form'
import { styled } from '@stitches/react'

type Props = {
  onSubmit: (videoUrl: string) => void
  isProcessing: boolean
}

export const VideoForm: React.FC<Props> = ({ onSubmit, isProcessing }) => {
  const handleSubmit: React.FormEventHandler<HTMLFormElement> = e => {
    e.preventDefault()

    const videoUrl = (e.target as HTMLFormElement | undefined)?.videoUrl
      .value as string
    onSubmit(videoUrl)
  }
  return (
    <FormRoot onSubmit={handleSubmit}>
      <FormField name="videoUrl">
        <Flex css={{ alignItems: 'baseline', justifyContent: 'space-between' }}>
          <FormLabel>Video URL</FormLabel>
          <FormMessage match="valueMissing">
            Please enter a video URL
          </FormMessage>
          <FormMessage match="typeMismatch">
            Please provide a valid URL
          </FormMessage>
        </Flex>
        <Form.Control asChild>
          <Input
            type="text"
            name="videoUrl"
            required
            placeholder="https://www.youtube.com/watch?v="
          />
        </Form.Control>
      </FormField>
      <Form.Submit asChild>
        <Button css={{ marginTop: 10 }} disabled={isProcessing}>
          {isProcessing ? 'Processing...' : 'Start processing'}
        </Button>
      </Form.Submit>
    </FormRoot>
  )
}

const FormRoot = styled(Form.Root, {})

const FormField = styled(Form.Field, {
  display: 'grid',
  marginBottom: 10
})

const FormLabel = styled(Form.Label, {
  fontSize: 15,
  fontWeight: 500,
  lineHeight: '35px',
  color: '$dracula$foreground'
})

const FormMessage = styled(Form.Message, {
  fontSize: 13,
  color: '$dracula$red',
  opacity: 0.8
})

const Flex = styled('div', { display: 'flex' })

const inputStyles = {
  all: 'unset',
  boxSizing: 'border-box',
  width: '100%',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: 4,

  fontSize: 15,
  color: '$dracula$foreground',
  backgroundColor: '$dracula$selection',
  boxShadow: `0 0 0 1px $gray400`,
  '&:hover': { boxShadow: `0 0 0 1px $dracula$comment` },
  '&:focus': { boxShadow: `0 0 0 2px $dracula$pink` },
  '&::selection': { backgroundColor: '$gray600', color: 'white' }
}

const Input = styled('input', {
  ...inputStyles,
  height: 35,
  lineHeight: 1,
  padding: '0 10px'
})

const Button = styled('button', {
  all: 'unset',
  boxSizing: 'border-box',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: 4,
  padding: '0 15px',
  fontSize: 15,
  lineHeight: 1,
  fontWeight: 500,
  height: 35,
  width: '100%',

  backgroundColor: '$dracula$purple',
  color: '$dracula$foreground',
  boxShadow: `0 2px 10px $dracula$currentLine`,
  '&:not(:disabled):hover': { backgroundColor: '$dracula$purpleDark' },
  '&:not(:disabled):focus': { boxShadow: `0 0 0 2px black` }
})
