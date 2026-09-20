
Claude code saves sessions as you work. 

- claude --continue - restore last session
- claude --resume - you can pick session from the list
- claude --resume {id} - resume session by id
- claude -n return-validation  - you can name session during creation
- claude --resume return-validation - then if session is named you can resume it by name
- /rename return-validation - you can name/rename session inside it


Claude code stores session transcripts locally, saved continiously as you work under

```
~/.claude/projects/<project>/<session-id>.jsonl
```


For serious work protect youself against lost state:

- Use meaningful session names
- Keep stratchpad notes
- Run /export for a readable transcript
- Avoid not-persistent runs


#### Skills

Skill frontmatter:

- name - skill name
- description - when the skill should run
- argument-hint - what input to provide
- allowed-tools - limits what it can do 
- context: fork - runs in isolation, returns a summary


#### CI/CD

Run in print mode, to nota start default conversation one question, one final response

```
claude -p # or claude --print
 --output-format json
 --json-scheam findings.json
 
 "Your CI/CD prompt, eg review MR ..."
```

To be able CI/CD to analyze response use json ouput format.

Response schema should be:

- file path
- line number
- serverity
- category
- message
- suggestion 
- fingerprint - fingerprint is stable id used to not report same finding issue after each review