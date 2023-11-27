# timer-homework-broken

## How to test

Please run this command:  
`npm test`

## How to deploy

Please run this command:  
`ng deploy --base-href=/timer-homework-broken-v13/`

## Deployed site

Fully working example can be found [here](https://arielbar.github.io/timer-homework-broken-v13/)

---

## Requirements

### Tasks to be done

- known bugs should be fixed.
- unit tests should pass.
- `//FIXME:` comments should be fixed.
- any additional performance improvements - BONUS!
- clean code - BONUS!
- additional unit tests - HUGE BONUS!
- **create PR for review**.

#### This is example of working application.

The user can input a text and click Add

- A new task is added with the title, and 00:00 time, and a play button.
- Clicking Play will play this task: the timer will start running, and the icon will change to a pause icon.
  Also - any other running task will be paused.
- Clicking Pause will pause the task.
- The total time is always updated.
- Please implement the redux state, actions and reducers. If you have time - implement the UI as well using >React / Angular (no need for fancy HTML/CSS).

![alt](https://cloud.githubusercontent.com/assets/889418/23171775/299f5252-f85c-11e6-8f1c-5e66037bf5fa.png)

### Known Bugs

- while adding a new task, should be capitalized, but it is not, while adding another task, the previous became capitalized. another way to reproduce is to press play&stop.
  ![](./docs/bug%201.png)
  'AAAA' is capitalized, 'bbbb' should be capitalized too.

  ## How send task back?
  There is no option to create a branch from original repo, pls fork and open PR from fork

---

- task name should be unique.
  ![](./docs/bug%202.png)
