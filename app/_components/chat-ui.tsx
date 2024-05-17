import { Message } from "@/llm/interface"
import { continueConversation } from "../actions"
import { readStreamableValue } from "ai/rsc"

type ChatUIProps = {
  conversation: Message[],
  setConversation: Function,
  input: string,
  setInput: Function
}

export const ChatUI = (props: ChatUIProps) => {
  return (
    <div className="flex flex-col items-center h-screen">
      <div className="border border-slate-300 flex flex-col items-center w-4/5 p-3 mt-2 grow">
        {props.conversation.map((message, index) => {
          return message.role === 'assistant'
            ? <AgentChatBubble message={message.content} key={`${index}-agent-msg`} />
            : <UserChatBubble message={message.content} key={`${index}-user-msg`} />
        })}

      </div>
      <InputBox
        input={props.input}
        setInput={props.setInput}
        conversation={props.conversation}
        setConversation={props.setConversation}
      />
    </div>
  )
}

const AgentChatBubble = (props: { message: string }) => {
  return (
    <div className='flex justify-start w-full text-left'>
      <div className='max-w-prose bg-yellow-100 p-2 rounded-md'>
        {props.message}
      </div>
    </div>
  )
}

const UserChatBubble = (props: { message: string }) => {
  return (
    <div className='flex w-full justify-end text-right pt-3'>
      <div className='max-w-prose bg-yellow-100 p-2 rounded-md'>
        {props.message}
      </div>
    </div>
  )
}

const InputBox = (props: {
  input: string,
  setInput: Function,
  conversation: Message[],
  setConversation: Function
}) => {
  return (
    <div className='flex flex-none w-4/5'>
      <input
        className='border border-slate-300 p-3 mb-3 rounded-md grow'
        placeholder='Type new message here...'
        value={props.input}
        onChange={event => {
          props.setInput(event.target.value);
        }}
      />
      <button
        className='border flex-none p-3 rounded-md mb-3'
        onClick={async () => {
          props.setInput('')
          const newConversation = [
            ...props.conversation,
            { role: 'user', content: props.input } as Message,
          ]

          props.setConversation(newConversation)

          const { messages, newMessage } = await continueConversation(newConversation);

          let textContent = '';

          for await (const delta of readStreamableValue(newMessage)) {
            textContent = `${textContent}${delta}`;

            props.setConversation([
              ...messages,
              { role: 'assistant', content: textContent },
            ]);
          }
        }}
      >
        Submit
      </button>
    </div>
  )
}