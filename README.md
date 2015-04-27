# [Hypo](http://voski.io/hypo)
Hypo is a [hypocycloid](http://en.wikipedia.org/wiki/Hypocycloid) with some neat features. Rolled out with JS and HTML5 Canvas.

Two canvas elements are layered. One is used to draw and the other is used to optionally display Hypo's movement.

Currently under development with multiple features coming soon. Please note this can quickly become very computationally intensive once things start to get a little crazy :) 

##Components

###Plane
We have an inner point called Plane which is rotating around in a circle with variable frequency and amplitude.

This can be displayed or hidden including it's path.

### Hyper
The Plane itself is rotating along its path we call this rotation Hyper. Frequency, and amplitude are also adjustable.

### Rod Length
Extending from the middle of the Plane is a rod of adjustable length. The length can be set to oscillate or to be a constant.

The rod can be displayed or hidden.

### Color
Color can be set as a function of the Plane period. This allows us to do cool things like change the color per trace of the shape.

### Pixel Size
Pixel length and width can be adjusted

### Speed
We can adjust how fast the entire mechanism sketches. Some shapes take a long time to form so speeding them up is nice.


### Spiral
So the path of our Plane can be set to oscillate as well. This can lead to some interesting shapes but I would wait till you are more comfortable with syncing periods before you jump into this. You can still get awesome shapes without it!

## Tips
Try to sync your periods so they are all share a common multiple. The goal here is to have all the periods eventually sync in order to draw a continuous shape.


## Coming soon
- Adjust params in browser
- Pause/Start
- Presets
- Save/Load
- Custom colors
- Share functions
- Gradients
- Oscillating pixel size
- Multiple rods
