# Pokémon Emerald: The Platform Game
If you want to play the game I made, [click here and Pokémon away my friend](https://besartelezi.github.io/challenge-parallax/).
If you'd rather glue your eyes on to my README and inhale all possible information, then please stay on this page and read away my friend!

## Creating a ~~Paarthurnax~~ Parallax effect
**In short**: I will be creating a platform/endless runner game.
And now in *not so short:*

The goal of this assignment is to create a multi-layered parallax effect, with our own fun little twist on it.
Different layers need to move at different speeds, the first (the ground) is the fastest, while the last layer (the sky) is the slowest.
Images have already been given to us by the coaches, but we're free to create/find our own images if we so desire.
These are the must-have requirements of this assignment.

- A page with a moving background that looks natural
- Something of your personal choosing to enhance the page, go take a look at the suggestions or come up with something yourself!

One of the suggestions the coaches gave us is to create a platform game/endless runner.
And that's precisely what I will be aiming for.

**So in short one more time**: I will be creating a platform/endless runner game.

## To-Do List
- [x] Add basic code structure (HTML, CSS and JS)
- [x] Add all images that I made myself
- [x] Do some research on the parallax effect
- [x] And some research on the multi-layered parallax effect
- [x] Add favicon
- [x] Big Goal #1: Get images for the Pokémon Game for the Parallax background
  - [x] Grass
  - [x] Clouds
  - [x] Sea
  - [x] Sky
  - [x] Trees (from other Pokémon game)
  - Flying Pokémon
    - Might just add Latios flying, and when it hits something it explodes (Spongebob Style)
  - Once I start in canvas, I need to remember that the pixels of the images are 960 / 600
- [x] Create parallax effect with Pokémon assets
  - [x] Add Canvas in HTML
  - [x] Style Canvas in CSS
  - [x] Start out by just looping/animating one part/one asset
    - [x] This asset needs to keep looping
  - [x] Once one part of parallax is done, do the same for the other parts
  - [x] When parallax effect works -> double check on github if it works properly!
  - [x] Make sure it keeps looping
  - [x] OOP - Create a class called "BackgroundAnimation" (name may be changed in the future)
    - This is needed to give different properties to every 'BackgroundAnimation' object (assets)
- [x] Get artwork for Pokémon Game
  - [x] Get sprite images of Torchic, Mudkip, and Treecko
  - [x] Get sprite images of other Pokémon that might appear as obstacles
    - [x] Grass
    - [x] Normal
    - [x] Fire
    - [x] Water
      - The User's Pokémon + The Obstacles = Need to be in classes so I can add more in the future
  - [x] Get sprite images of fire attack, grass attack, and water attack
    - [x] Just one attack sprite, once attacking works, add others
      - [x] Fire
      - [x] Water
      - [x] Grass
- [x] Add Pokémon on the parallax
  - [x] Create a class to create the Pokémon
  - [x] Add the Pokémon
  - [x] Let the Pokémon move up and down on key button press down
- [x] Add obstacles
  - [x] Create class Obstacles
  - [x] Create boolean let variable hasLost
  - [x] One of the properties should be 'type'
  - [x] Add Obstacle
  - [x] Make obstacle move
  - [x] Add multiple obstacles
  - [x] Make it so obstacles will keep spawning
  - [x] Create a collision, something must happen when obstacle hits player
    - [x] When Pokémon gets hit by obstacle, no matter the typing = (dead)
- [x] Add Attack functionality
  - [ ] Spacebar = Pokémon Attack
    - [ ] Currently, A is used for attacks because I haven't figured out yet how to attack with spacebar.
    - [x] Set Timeout, shoot only a single projectile instead of sick barrage of projectiles
  - [x] Add collision with obstacle Pokémon
    - [x] When Pokémon attack type > obstacle Pokémon type = Obstacle removed
    - [x] When Pokémon attack type <= obstacle Pokémon type = Obstacle still there
- [x] Add Grass attacks
- [x] Add water attacks
- [x] Add Switch Functionality
  - [x] Switch between the Pokémon
    - [x] Different buttons call different Pokémon
    - [x] A = Grass, Z = Fire and E = Water
    - [x] Fix Attacks
    - [x] Fix positioning when switching
- [ ] Add start game button
  - [ ] Make button work, run the entire game once button has been pressed
  - [ ] When user Pokémon faints, show end screen + retry button or go back to page button
- [ ] Add Point system
  - [x] Add let variables of type total points
  - [x] When pokemon defeats obstacle Pokémon, their respective type points grows
  - [ ] Add visual of total type points
- [ ] Edit layout game
  - [ ] 
- [ ] Add more different Pokémon
## Extra's when finished
- [ ] Add animations to user Pokémon
  - https://pokemondb.net/sprites/mudkip
    - [ ] Pokémon Black/White have animated sprites, one where they're also jumping.
    - I can make a sprite sheet of those gifs, one for their idle animation, one for their jumping.
      - This is something would cost a lot of time, time I'd rather spend on figuring out the logic on making the game work instead of looking good.
- [ ] Instead of Pokémon moving up and down, let them jump

## Lettuce Learn Canvas
While doing my research on this assignment (asking questions to Google, a magic 8-ball and my mom who knows nothing about coding), I stumbled upon something called canvas.
Then I found [an interesting video on YouTube](https://www.youtube.com/watch?v=Mg7ibYWhjPI) that delves more into this subject.
I've never used canvas before, so I really want to try it out and learn in during this assignment.

## Name of the game: Pokémon!!
The very first Pokémon game I ever played was Pokémon Emerald.
So I have a strong emotional connection to it.
That's why I chose to create a platform game with a parallax effect using the sprites/art from that game.
During the intro, there was a scene of the main characters riding their bikes with their Pokémon.
I want to use this as background for the parallax effect, and maybe add some other stuff to enhance the parallax experience as well.

![alt-text](resources/readme-images/pokemon-emerald.webp)

I used a free, alternative version to split up all the elements of the image you that I just showed.
It's called [photopea.com](https://www.photopea.com/) and it was a lifesaver!
I do think I might have spent too much time on making it look good and not enough on actually programming, that is something I'm afraid of.
But on the other hand, if it looks cool I can be more proud of it so it was 100% worth it to invest that time in the images.

## Youtube, a blessing and a curse
The video I found helped me out **A LOT** on this assignment.
It might've been working even a bit *too well*.
I feel that if I focus too much on the video and just mindlessly copy pasta of someone on YouTube, I won't learn anything.
That's why I'm forcing myself to comment as much of my Javascript code as possible in this assignment.
The video itself explains everything very thoroughly and I'm definitely learning a lot from it.
But still, just to be 100% entirely sure that I'm actually learning, commenting everything for my own sake is something that is necessary.

## Time to Game
Doritos Dust: Collected. Gaming Gear: Connected. Women: Respected. Oh yeah, It's gamer time!
Now that I have finished the parallax effect on my page, it is (gamer) time to figure out what the game will be and what rules it will have.

Here are a few suggestions:
* You're playing as Latios, flying through the map. You need to dodge everything coming your way (other Pokémon, Pokéballs trying to catch you, Pokémon attacks)
* You're playing as Torchic, Mudkip and Treecko. (You play as just one Pokémon, but you can switch between them)
  * You can dodge Pokémon, you can use fire moves against grass Pokémon to defeat them, so they won't be an obstacle in your way anymore
  * You can't get rid of water type Pokémon
  * The longer the game is continuing on, the bigger the Pokémon will be that start appearing (wailord, kyogre,...)
  * Make it possible to switch between Pokémon, so you can switch between the 3 starters
    * So if you're playing as Torchic (fire type) and all of a sudden a Squirtle appears (water type, you can switch to Treecko (a grass type) and defeat the Squirtle instead of doding it
  * Add a Point system per Pokémon defeated
    * Add Shiny Pokémon chance, shinies are worth 10x more points as normal
  * EVOLUTION, once you have a certain amount of points, your Pokémon evolve, first Treecko, then Mudkip, and then Torchic
    * Evolved Pokémon move faster + attack faster
  * Add normal type obstacles
    * Player can't defeat them, these need to be dodged
  * Different Pokémon = different sized obstacles
    * Snorlax = big and slow
    * Linoone, medium-sized and very fast
    * Charizard = big and can move up and down randomly

After writing everything out, I came to the conclusion that making the Latios game might be easier, making the 3 starters game would be WAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAY more fun.
And thus, I shall be trying to create the Pokémon: Starters Adventure game.

![alt-text](resources/readme-images/buff-torchic.gif)

## Buff Torchic Scorching Mamma Earth
After adding the attacking functionality, I started feeling like a fully fl**egg**ed big brain Developer Extraordinaire.
There was a very minor issue with the attacking functionality tho.
Instead of it only firing out a single flame, it sent out fires fueled by the Dark Lord Himself.
But that's nothing a lil' interval can't fix!
So instead of **chickening** out, I decided to jump right back into the code and try to balance the game!

![alt-text](resources/readme-images/torchic-fire.png)

## Positioning, damn this is difficult
At this point, the switching function works, the attacking works, everything is looking crispy and creamy.
Except for one bug that's destroying the game in my opinion.
When the user switches Pokémon, the newly switched in Pokémon won't be placed at the x and y coordinates of the previous Pokémon.
Instead, they will be placed at the x and y coordinates of the location they previously were BEFORE switching.
I understand how this bug works, but good lordy I'm having trouble figuring out how to fix it.

I was finally able to fix it, but I found a very creative solution to the problem.
When the user moves the Pokémon, they also move the x and y of the current Pokémon.
But not of the other 2 Pokémon that the user can switch in.
This is how I solved it.

````
 if (keys["ArrowUp"] && currentPokemon.y > 0) {
        //created this if statement, so that all the x and the y will stay the same
        if (currentPokemon === torchic) {
            currentPokemon.y -= currentPokemon.speed;
            treecko.y -= treecko.speed;
            mudkip.y -= mudkip.speed;
        }
        if (currentPokemon === treecko) {
            currentPokemon.y -= currentPokemon.speed;
            torchic.y -= torchic.speed;
            mudkip.y -= mudkip.speed;
        }
        if (currentPokemon === mudkip){
            currentPokemon.y -= currentPokemon.speed;
            torchic.y -= torchic.speed;
            treecko.y -= treecko.speed;
        }
    }
````
I wanted to create another class, called the Trainer class, and have it's x and y switched with that of the current Pokémon.
But I couldn't find a way to make it work, so I though this might work.
In the end it did, so I'm glad I was able to resolve the issue, but I would've liked to have found a better solution to this problem.

## Layout, not laying eggs
Once I'm done with the most key features of the game, I will be able to shift my focus to the layout of the site.
The background colour will remain this shade of green, since it reminds me the most of the game Pokémon Emerald, the game that inspired me to create my own game.

For the layout itself, I have added a paint image below to showcase how I want the layout to eventually look like.
I might not follow the design 100% though, since things can always change.

![alt-text](resources/readme-images/layout.png)

## Concluding this Conclusion, Constant Control in the Corner
In short, I'm very damn proud of myself for the way I tackled this assignment and because of the result I achieved.
There are still some features I'd like to add, some bugs that might need a fixer-upper.

