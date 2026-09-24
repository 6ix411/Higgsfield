# Kraken Attack: Seedance 2.0 test clips

Settings: `seedance_2_0`, 720p, 15 s, 16:9, genre `horror`, `generate_audio: true`. Cost: 67.5 credits per clip.
Output is flat 16:9 first-person video, not 360°. Add text overlays ("LOOK BEHIND YOU", "DEPTH: 50 m") in the edit, because AI-rendered text is unreliable.

## Clip 1: Cold open → boarding → lift hill (script 0:00–0:45)
Job: `be612590-3a05-4b45-984d-cf4417bc1492`

```
First-person POV ride video, cinematic 3D CGI animation, vivid saturated colors, level horizon, no on-screen text, no people's faces. Shot 1 (0-3s): pitch black, then two gigantic glowing yellow octopus eyes open directly in front of the camera, slit pupils contracting, a huge tentacle whips past from right to left. Hard cut. Shot 2 (3-9s): POV seated in the front car of a rusty old wooden roller coaster on a creaky seaside pier at golden sunset, a metal lap bar locks down in the foreground, seagulls overhead, the track stretches out over a dark stormy ocean, a small retro robot ride operator waves from the left side, its eye flickers red. The car starts rolling. Shot 3 (9-15s): the coaster climbs a steep chain lift hill, camera tilts up toward storm clouds, wind rising; at the top the camera looks down at the ocean where an enormous ship-sized dark shadow glides under the waves. Sound: deep underwater rumble, heartbeat, whoosh, creaking wood, gulls, distant carnival music, clacking chain lift, howling wind.
```

## Clip 2: Drop → underwater tube → first tentacle strike (script 0:45–1:40)
Job: `cd22a7cc-345d-40ff-b637-ba471eaaa61c`

```
First-person POV ride video from the front car of a roller coaster, cinematic 3D CGI animation, vivid saturated colors, level horizon, no on-screen text, no people's faces. Shot 1 (0-4s): the coaster plunges down a near-vertical drop straight toward a stormy ocean at sunset and splashes through the surface. Shot 2 (4-9s): the track continues inside a transparent glass tube tunnel deep underwater, blue-green light rays, bubbles swirling, a school of silver fish splits around the tube, a shark swims alongside on the right matching speed, then suddenly every fish and the shark flee past the camera in panic. Shot 3 (9-15s): a colossal kraken tentacle covered in suckers slams against the glass tube on the right side, the glass cracks in a spiderweb pattern spreading overhead, water begins to drip, red warning lights flash and the coaster accelerates forward into darkness. Sound: rushing air, big splash, muffled underwater boom, bubbles, deep monstrous growl, loud glass crack, alarm klaxon, dramatic horror score.
```

## Tips for the remaining clips
- Reuse the opening sentence (style lock) word for word in every prompt so the clips look consistent.
- Pass the previous clip's job ID as `start_image` or `image_references` to keep the Kraken and coaster looking the same.
- Keep each prompt to 3 shots per 15 s. More than that and Seedance tends to rush or skip beats.
