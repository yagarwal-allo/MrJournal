# MRJournal
MRJournal is your personal journaling assistant which can help you note down certain tasks and ask it about them later.

## Setting Up the local environment

- Copy .example to .env.local using the following command

```sh
cp .example.env .env.local
```
- Replace placeholders with your secrets.
- Start the app with following command:
```sh
yarn dev
```

## Tasks:
- [x] Create a basic journaling agent.
- [x] Add streaming support in the agent.
- [x] Handle the errors gracefully. Rate limit / Content moderation / Other errors.
- [x] Take care of hallucinations and tasks out of scope.
- [x] Integrate with a chat interface.