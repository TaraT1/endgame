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

## Scrimna Learn React with Bob Ziroll (fcc)
- recap:
    - Built static, read-only pages
    - Declarative, 
    - composable (build reusable pieces)
    - setting up new react project
    - jsx, custom components
    2. Data driven pages (travel journal)
        - reusability, props, creating components from an array
    3. Interactive web apps
        - event listeners, state, conditional rendering
        - forms (more closely aligned with native forms)
        - state mgt strategies
    4. Side Effects
        - controlled components (forms)
        - functional programming (immutability) in React
        - escape hatch: fetching data with side effects
    
    - capstones: tenzies & end game

- next steps:
    - advanced react course on scrimba
    - ts (free on scrimba)
    - react router
    - fs: next.js/remix (handle data interactions)
    - be: node/express/REST APIs
    - deployment

### Deploy
- scrimba discord refs
- vercel failed with fs app
- render 
- github as front end; render or railway.com for be
- import github repo using netlify, cercel or cloudflare pages
    - watch for free tiers. Keep payment deets off account