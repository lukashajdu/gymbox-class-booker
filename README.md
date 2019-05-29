# Gymbox Class Booker

**Installation**
1. Clone repository and install dependencies
    ``` 
    $ git clone git@github.com:lukashajdu/gymbox-class-booker.git
    $ cd gymbox-class-booker
    $ npm install
    ```
2. Create configuration file and insert your credentials and executable path to Chromium browser
    ```
    $ cp config.js.dist config.js
    ```
3. (Optional) Update `selectors.js` to include your favourite classes and clubs

**Run booker**

```
node book.js <CLASS_NAME> <HH:MM> <CLUB_NAME>
```
