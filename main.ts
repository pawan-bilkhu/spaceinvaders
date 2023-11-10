enum ActionKind {
    Walking,
    Idle,
    Jumping
}
namespace SpriteKind {
    export const Asteroid = SpriteKind.create()
    export const LargeAsteroid = SpriteKind.create()
}
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    playerProjectile = sprites.createProjectileFromSprite(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . 4 4 . . . . . . . 
        . . . . . . 4 5 5 4 . . . . . . 
        . . . . . . 2 5 5 2 . . . . . . 
        . . . . . . . 2 2 . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `, playerSprite, 125, 0)
    playerProjectile.x += 15
})
function spriteExplode (mySprite: Sprite) {
    mySprite.lifespan = 400
    mySprite.setFlag(SpriteFlag.GhostThroughSprites, true)
    animation.runImageAnimation(
    mySprite,
    [img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . 4 4 . . . . . . . 
        . . . . . . 4 5 5 4 . . . . . . 
        . . . . . . 2 5 5 2 . . . . . . 
        . . . . . . . 2 2 . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `,img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . 4 . . . . . 
        . . . . 2 . . . . 4 4 . . . . . 
        . . . . 2 4 . . 4 5 4 . . . . . 
        . . . . . 2 4 d 5 5 4 . . . . . 
        . . . . . 2 5 5 5 5 4 . . . . . 
        . . . . . . 2 5 5 5 5 4 . . . . 
        . . . . . . 2 5 4 2 4 4 . . . . 
        . . . . . . 4 4 . . 2 4 4 . . . 
        . . . . . 4 4 . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `,img`
        . 3 . . . . . . . . . . . 4 . . 
        . 3 3 . . . . . . . . . 4 4 . . 
        . 3 d 3 . . 4 4 . . 4 4 d 4 . . 
        . . 3 5 3 4 5 5 4 4 d d 4 4 . . 
        . . 3 d 5 d 1 1 d 5 5 d 4 4 . . 
        . . 4 5 5 1 1 1 1 5 1 1 5 4 . . 
        . 4 5 5 5 5 1 1 5 1 1 1 d 4 4 . 
        . 4 d 5 1 1 5 5 5 1 1 1 5 5 4 . 
        . 4 4 5 1 1 5 5 5 5 5 d 5 5 4 . 
        . . 4 3 d 5 5 5 d 5 5 d d d 4 . 
        . 4 5 5 d 5 5 5 d d d 5 5 4 . . 
        . 4 5 5 d 3 5 d d 3 d 5 5 4 . . 
        . 4 4 d d 4 d d d 4 3 d d 4 . . 
        . . 4 5 4 4 4 4 4 4 4 4 4 . . . 
        . 4 5 4 . . 4 4 4 . . . 4 4 . . 
        . 4 4 . . . . . . . . . . 4 4 . 
        `,img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . b b . b b b . . . . . 
        . . . . b 1 1 b 1 1 1 b . . . . 
        . . b b 3 1 1 d d 1 d d b b . . 
        . b 1 1 d d b b b b b 1 1 b . . 
        . b 1 1 1 b . . . . . b d d b . 
        . . 3 d d b . . . . . b d 1 1 b 
        . b 1 d 3 . . . . . . . b 1 1 b 
        . b 1 1 b . . . . . . b b 1 d b 
        . b 1 d b . . . . . . b d 3 d b 
        . b b d d b . . . . b d d d b . 
        . b d d d d b . b b 3 d d 3 b . 
        . . b d d 3 3 b d 3 3 b b b . . 
        . . . b b b d d d d d b . . . . 
        . . . . . . b b b b b . . . . . 
        `],
    50,
    false
    )
}
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Asteroid, function (sprite, otherSprite) {
    info.changeLifeBy(-2)
    music.play(music.melodyPlayable(music.footstep), music.PlaybackMode.InBackground)
    spriteExplode(otherSprite)
    sprites.destroy(sprite, effects.disintegrate, 500)
})
sprites.onOverlap(SpriteKind.Asteroid, SpriteKind.Enemy, function (sprite, otherSprite) {
    music.play(music.melodyPlayable(music.bigCrash), music.PlaybackMode.InBackground)
    spriteExplode(otherSprite)
    sprite.startEffect(effects.disintegrate, 200)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Asteroid, function (sprite, otherSprite) {
    info.changeLifeBy(-2)
    music.play(music.melodyPlayable(music.bigCrash), music.PlaybackMode.InBackground)
    scene.cameraShake(10, 500)
    spriteExplode(otherSprite)
    sprite.setFlag(SpriteFlag.GhostThroughSprites, true)
    sprite.startEffect(effects.fire)
    pause(1000)
    effects.clearParticles(sprite)
    sprite.setFlag(SpriteFlag.GhostThroughSprites, false)
})
info.onLifeZero(function () {
	
})
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Enemy, function (sprite, otherSprite) {
    music.play(music.melodyPlayable(music.thump), music.PlaybackMode.InBackground)
    spriteExplode(otherSprite)
    sprites.destroy(sprite)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    info.changeLifeBy(-1)
    music.play(music.melodyPlayable(music.smallCrash), music.PlaybackMode.InBackground)
    scene.cameraShake(4, 500)
    spriteExplode(otherSprite)
    sprite.setFlag(SpriteFlag.GhostThroughSprites, true)
    sprite.startEffect(effects.fire)
    pause(1000)
    effects.clearParticles(sprite)
    sprite.setFlag(SpriteFlag.GhostThroughSprites, false)
})
let asteroidSprite: Sprite = null
let invaderSprite: Sprite = null
let playerProjectile: Sprite = null
let playerSprite: Sprite = null
info.setLife(3)
music.setVolume(130)
let invadersList = [img`
    . . . . . . . . . . . . . . 5 5 
    . . . . . . f f f f f f f 5 5 5 
    . . . . . . . . . . . . 5 5 5 5 
    . . . . . . . . . . . . 5 5 5 5 
    . . . . . . . . . . . 5 5 5 5 5 
    . . . . . . . . . . 5 5 5 5 5 5 
    . . . . . . . . 5 5 5 5 1 5 5 5 
    5 5 5 5 f 5 f 5 5 5 5 1 5 5 5 5 
    5 5 5 5 f 5 f 5 5 5 5 1 5 5 5 5 
    . . . . . . . . 5 5 5 5 1 5 5 5 
    . . . . . . . . . . 5 5 5 5 5 5 
    . . . . . . . . . . . 5 5 5 5 5 
    . . . . . . . . . . . . 5 5 5 5 
    . . . . . . . . . . . . 5 5 5 5 
    . . . . . . f f f f f f f 5 5 5 
    . . . . . . . . . . . . . . 5 5 
    `, img`
    . . . . . . . . . . . . . . 7 7 
    . . . . . . f f f f f f f 7 7 7 
    . . . . . . . . . . . . 7 7 7 7 
    . . . . . . . . . . . . 7 7 7 7 
    . . . . . . . . . . . 7 7 7 7 7 
    . . . . . . . . . . 7 7 7 7 7 7 
    . . . . . . . . 7 7 7 7 5 7 7 7 
    7 7 7 7 f 7 f 7 7 7 7 5 7 7 7 7 
    7 7 7 7 f 7 f 7 7 7 7 5 7 7 7 7 
    . . . . . . . . 7 7 7 7 5 7 7 7 
    . . . . . . . . . . 7 7 7 7 7 7 
    . . . . . . . . . . . 7 7 7 7 7 
    . . . . . . . . . . . . 7 7 7 7 
    . . . . . . . . . . . . 7 7 7 7 
    . . . . . . f f f f f f f 7 7 7 
    . . . . . . . . . . . . . . 7 7 
    `, img`
    . . . . . . . . . . . . . . 2 2 
    . . . . . . f f f f f f f 2 2 2 
    . . . . . . . . . . . . 2 2 2 2 
    . . . . . . . . . . . . 2 2 2 2 
    . . . . . . . . . . . 2 2 2 2 2 
    . . . . . . . . . . 2 2 2 2 2 2 
    . . . . . . . . 2 2 2 2 5 2 2 2 
    2 2 2 2 f 2 f 2 2 2 2 5 2 2 2 2 
    2 2 2 2 f 2 f 2 2 2 2 5 2 2 2 2 
    . . . . . . . . 2 2 2 2 5 2 2 2 
    . . . . . . . . . . 2 2 2 2 2 2 
    . . . . . . . . . . . 2 2 2 2 2 
    . . . . . . . . . . . . 2 2 2 2 
    . . . . . . . . . . . . 2 2 2 2 
    . . . . . . f f f f f f f 2 2 2 
    . . . . . . . . . . . . . . 2 2 
    `]
let asteroidList = [img`
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . c c c . . . . . . 
    . . . . . . a b a a . . . . . . 
    . . . . . c b a f c a c . . . . 
    . . . . c b b b f f a c c . . . 
    . . . . b b f a b b a a c . . . 
    . . . . c b f f b a f c a . . . 
    . . . . . c a a c b b a . . . . 
    . . . . . . c c c c . . . . . . 
    . . . . . . . c . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    `, img`
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . c c c c . . 
    . c c c c c . c c c c c f c c . 
    c c a c c c c c 8 f f c f f c c 
    c a f a a c c a f f c a a f f c 
    c a 8 f a a c a c c c a a a a c 
    c b c f a a a a a c c c c c c c 
    c b b a a c f 8 a c c c 8 c c c 
    . c b b a b c f a a a 8 8 c c . 
    . . . . a a b b b a a 8 a c . . 
    . . . . c b c a a c c b . . . . 
    . . . . b b c c a b b a . . . . 
    . . . . b b a b a 6 a . . . . . 
    . . . . c b b b 6 6 c . . . . . 
    . . . . . c a 6 6 b c . . . . . 
    . . . . . . . c c c . . . . . . 
    `, img`
    . . . . . . . . c c c c . . . . 
    . . . . c c c c c c c c c . . . 
    . . . c f c c a a a a c a c . . 
    . . c c f f f f a a a c a a c . 
    . . c c a f f c a a f f f a a c 
    . . c c a a a a b c f f f a a c 
    . c c c c a c c b a f c a a c c 
    c a f f c c c a b b 6 b b b c c 
    c a f f f f c c c 6 b b b a a c 
    c a a c f f c a 6 6 b b b a a c 
    c c b a a a a b 6 b b a b b a . 
    . c c b b b b b b b a c c b a . 
    . . c c c b c c c b a a b c . . 
    . . . . c b a c c b b b c . . . 
    . . . . c b b a a 6 b c . . . . 
    . . . . . . b 6 6 c c . . . . . 
    `]
playerSprite = sprites.create(img`
    c c . . . . . . . . . . . . . . 
    c c c . . . . . . . . . . . . . 
    c c c c . . . . . . . . . . . . 
    c c c f c c c c c c c c c . . . 
    c c c f e . . . . . . . . . . . 
    c c e f e c . . . . . . . . . . 
    e e e c 2 c e e . . . . . . . . 
    e e 2 c 2 c 2 e e f c f c c c c 
    2 2 2 e 2 e 4 4 2 f 2 f b d d d 
    2 2 2 e 4 e e e . . . . . . . . 
    2 2 2 f e e . . . . . . . . . . 
    2 4 4 f e . . . . . . . . . . . 
    4 2 2 e e e e e e e e e e . . . 
    2 2 e e . . . . . . . . . . . . 
    e e e . . . . . . . . . . . . . 
    e e . . . . . . . . . . . . . . 
    `, SpriteKind.Player)
controller.moveSprite(playerSprite)
playerSprite.setPosition(19, 58)
playerSprite.setStayInScreen(true)
effects.starField.startScreenEffect()
game.onUpdateInterval(2000, function () {
    invaderSprite = sprites.createProjectileFromSide(invadersList._pickRandom(), randint(-25, -50), 0)
    invaderSprite.y = randint(0, scene.screenHeight())
    invaderSprite.setKind(SpriteKind.Enemy)
})
game.onUpdateInterval(1000, function () {
    asteroidSprite = sprites.create(asteroidList._pickRandom(), SpriteKind.Asteroid)
    asteroidSprite.setPosition(scene.screenWidth(), randint(0, scene.screenHeight()))
    asteroidSprite.setVelocity(randint(-75, -100), 0)
})
