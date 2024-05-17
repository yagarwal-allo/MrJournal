## Setting Up the local environment

- Copy .example to .env.local using the following command

```sh
cp .example.env .env.local
```

- Replace placeholders with your secrets.

## Tasks:
- [x] Create a basic journaling agent.
- [x] Add streaming support in the agent.
- [x] Handle the errors gracefully. Rate limit / Content moderation / Other errors.
- [ ] Take care of hallucinations and tasks out of scope.
- [x] Integrate with a chat interface.