- Problems with vite version during install. Took awhile to realize it had to be in the vite install code. 


### 12 - lost languages
```javascript
return (
    <span 
        className={`badge ${isLanguageLost ? "lost" : ""}`}//for language badges
        key={language.name} 
        style={styles}
        > {language.name}
    </span>
)
//using clsx()
const className = clsx("badge", isLanguageLost && "lost")
return (
    <span 
        className={className}
        key={language.name} 
        style={styles}
        > {language.name}
    </span>
)
```

### Problem Horizontal Alignment
- elements with max-width were not center aligning
- Fix with:
    - 1: margin-inline: auto
    - 2: Apply flex to parent element (main)
        ```css
        main {
            display: flex;
            flex-direction: column;
            align-items: center;
        }
        ```

            background-color: #10A95B;

        Fix impacts status message - section.game-status becomes compressed. Fix for it is:
        ``` css
        section.game-status {
            width: 100%;
            max-width: 350px;
        }

### Emojis
Access menu with win+.

### Nested ternary for game-status 
``` jsx
            <section className={gameStatusClass}>
            {isGameOver ? (   
                isGameWon ? (
                <>
                    <h2>You win!</h2>
                    <p>Well done!🎉</p> 
                </>
            ) : (
                <>
                    <h2>Game Over!</h2>
                    <p> You lose! Better start learning Assembly 😭</p>
                </>
                )
            ): (
                    null
                )
            }
            </section>
```
- Can't use nested if:else statements inside of jsx expressions b/c they don't implicitly return anything. Expressions like ternaries automatically return value, so they get rendered in jsx. 

Using if:else in helper function
``` jsx
//helper function
function renderGameStatus() {
    if(!isGameOver) {
        return null
    }

    if( isGameWon) {
        return (...)
    } else {
        return (...)
    }
}

 
```

### multiple cursors in vscode
alt-click