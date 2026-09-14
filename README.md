# FellaFlow Connect

UPDATE THE EXISTING FellaFlow WEBSITE — DO NOT REBUILD IT FROM SCRATCH.

IMPORTANT:

Keep the existing FellaFlow design, navigation, pages, simulated community dataset, dark professional dashboard aesthetic, green/mint accents, animations, and all currently working functionality.

Do NOT remove or break any existing feature.

FellaFlow is a hackathon prototype for the FellaRide cold-start community problem.

The demo community is:

Northbridge Institute of Technology, Bengaluru

All user profiles, routes, rides, vehicle information and statistics are SIMULATED DEMO DATA. Do not present them as real people or real collected data.

Keep the existing pages:

1. Dashboard

2. Community DNA

3. Bottleneck

4. Seed Finder

5. Ripple Simulator

6. Ride Matches

7. Network Growth

Now add the following features throughout the existing prototype.

==================================================

1. VEHICLE INFORMATION

==================================================

Add vehicle information wherever driver/ride information is displayed.

Every driver/ride should be able to show:

• Vehicle Type

• Vehicle Model

• Seating Capacity

• Available Seats

Example simulated data:

Aarav:

Vehicle Type: Hatchback

Vehicle Model: Hyundai i20

Seating Capacity: 5

Available Seats: 3

Meera:

Vehicle Type: Sedan

Vehicle Model: Honda City

Seating Capacity: 5

Available Seats: 2

Rohan:

Vehicle Type: SUV

Vehicle Model: Tata Nexon

Seating Capacity: 5

Available Seats: 3

Use realistic but clearly simulated vehicle data.

In Ride Matches, display these details inside each ride card.

Example:

Aarav

Whitefield → Campus

8:10 AM

Hyundai i20 • Hatchback

3 seats available

Do not overcrowd the interface. Use compact information chips/cards.

==================================================

2. WOMEN-ONLY RIDE SAFETY OPTION

==================================================

Add an optional "Women Only" ride safety preference.

This should be available when creating/selecting a ride and also visible in Ride Matches.

Add:

[ Women Only ] toggle

When enabled:

• The ride is marked "Women Only"

• Only compatible female passenger profiles should appear in the simulated matching results

• Display a clear safety badge such as:

  "Women-only ride"

Also add a small "Ride Safety" section containing:

✓ Women-only option

✓ Verified community members

✓ Shareable route

✓ Audio recording option

IMPORTANT:

This is a prototype safety feature. Do not claim that it guarantees safety.

Use wording such as:

"Additional safety preference"

rather than "100% safe".

==================================================

3. RIDE AUDIO RECORDING

==================================================

Add an "Audio Recording" safety feature for rides.

In the Ride Details / Ride Match interface, add:

Audio Safety

[ Enable Recording ]

When enabled, show:

● Recording enabled

"Ride audio can be recorded for safety and incident review."

Add a simulated recording control:

[ Start Recording ]

When clicked, show a simple recording state:

● Recording

00:00

and:

[ Stop Recording ]

After stopping, display:

"Audio recording saved for this demo ride."

IMPORTANT:

This is a SIMULATED prototype feature.

Do not implement hidden/background recording.

Show a clear consent message before recording:

"All participants must consent before audio recording begins."

The feature should visually demonstrate the concept without secretly accessing the microphone.

==================================================

4. MAP ROUTE VISUALIZATION

==================================================

Add a map-style route visualization to Ride Matches and Ride Details.

For every sample ride, show:

START LOCATION → DESTINATION

Example:

Whitefield

      ↓

Marathahalli

      ↓

Northbridge Institute of Technology

Display the route on a clean map-style panel.

The prototype can use a simulated/static map visualization if a real map API is not configured.

Do NOT require users to provide a real location.

Use simulated route data.

The map should visually show:

• Start point

• Destination

• Route line

• Optional intermediate point

• Estimated departure time

• Available seats

Example:

WHITEFIELD

     ●

      ╲

       ╲

        ● MARATHAHALLI

          ╲

           ╲

            ● CAMPUS

Add a small label:

"Simulated route"

==================================================

5. UPGRADE RIDE MATCHING

==================================================

Improve the existing Ride Matches page.

Each match should now show:

Driver

Route

Time

Compatibility Score

Vehicle Type

Vehicle Model

Available Seats

Women-only preference

Audio safety option

Map route

Example:

--------------------------------

Aarav

Whitefield → Campus

8:10 AM

92% Compatibility

Hyundai i20 • Hatchback

3 seats available

✓ Route match

✓ Time match

✓ Community match

🛡 Women-only available

🎙 Audio recording available

[ View Route ]

[ View Ride ]

--------------------------------

Keep the compatibility score and existing matching logic.

==================================================

6. RIDE DETAILS PAGE / MODAL

==================================================

When the user clicks "View Ride" or a similar button, open a detailed ride view.

Show:

RIDE DETAILS

Driver:

Aarav

Route:

Whitefield → Marathahalli → Northbridge Institute of Technology

Departure:

8:10 AM

Vehicle:

Hyundai i20

Hatchback

5 seats

3 seats available

Safety Preferences:

✓ Verified community member

✓ Women-only option

✓ Audio recording available

MAP ROUTE:

Display the simulated route visualization.

AUDIO SAFETY:

[ Enable Recording ]

Show the consent message:

"Audio recording requires consent from all participants."

==================================================

7. COMMUNITY DNA IMPROVEMENT

==================================================

On Community DNA, include additional simulated mobility insights:

Potential Drivers

Potential Passengers

Potential Connectors

Also show:

Vehicle Capacity Distribution

Example:

4-seater: 4 vehicles

5-seater: 9 vehicles

6+ seater: 2 vehicles

This should help FellaFlow understand whether the community has enough vehicle capacity to activate rides.

Also add:

"Seat Capacity Bottleneck"

Example:

Current potential:

14 drivers

52 passengers

38 available seats

Insight:

"Passenger demand exceeds available ride capacity."

Recommended action:

"Prioritize high-impact drivers with 2+ available seats."

==================================================

8. BOTTLENECK LOGIC

==================================================

Upgrade the Bottleneck page so that the system can identify different bottlenecks.

Possible bottlenecks:

• Driver shortage

• Passenger shortage

• Insufficient seating capacity

• Route mismatch

• Time mismatch

For the current simulated community, keep:

PRIMARY BOTTLENECK:

Driver / seating capacity shortage

Show:

"2–3 high-potential drivers could unlock this travel cluster."

Recommended Action:

"Recruit high-impact drivers travelling from Whitefield between 8:00–8:30 AM with 2+ available seats."

==================================================

9. SEED FINDER

==================================================

Keep the existing Seed Finder.

For each seed user, add useful activation information:

Name

Role

Impact Score

Route

Travel Time

Vehicle / Seats if driver

Reason for selection

Example:

Aarav

Driver

Impact Score: 94

Whitefield → Campus

8:10 AM

Hyundai i20

3 seats available

Why selected:

High route overlap + high seat capacity + peak-time travel

Make the score explainable.

Do NOT claim this is machine learning unless an actual ML model is implemented.

Call it:

"Community Impact Score"

==================================================

10. RIPPLE SIMULATOR

==================================================

Keep the existing Ripple Simulator.

The simulation should demonstrate:

0 users

↓

3 seed users

↓

11 connections

↓

5 first ride opportunities

↓

14 referrals

↓

28 active participants

Add the effect of vehicle capacity to the simulation.

Show:

Available seats unlocked

Ride opportunities created

New connections

Referrals

Example:

3 seed drivers

→ 8 available seats

→ 5 first ride opportunities

→ 14 referrals

→ 28 active participants

Make the network graph expand as the simulation progresses.

Keep the butterfly/ripple visual effect.

At the end show:

🦋 NETWORK ACTIVATED

"More users → More rides → Better matches → More users"

Community Health:

78/100

==================================================

11. DASHBOARD

==================================================

Keep the current dashboard design.

Add a small "Mobility Capacity" section.

Show:

128 profiles

14 potential drivers

52 potential passengers

38 available seats

8 potential connectors

Also show:

Safety-enabled rides

Women-only eligible rides

Audio-enabled rides

These can be simulated demo statistics.

Do not make the dashboard overcrowded.

==================================================

12. PRIVACY AND SAFETY

==================================================

Add a small, professional "Safety & Privacy" note somewhere appropriate.

Text:

"FellaFlow uses consent-based safety features. Location and audio features require participant permission."

Also state:

"Demo uses simulated community data."

Do not claim real-time tracking, real identity verification, or guaranteed safety.

==================================================

13. DESIGN REQUIREMENTS

==================================================

Maintain the existing FellaFlow visual identity:

• Dark navy/black background

• Mint/green primary accent

• Clean modern dashboard

• Subtle cyan/purple secondary accents

• Rounded cards

• Network/ripple visuals

• Professional hackathon presentation quality

• Responsive design

Use icons for:

🚗 Vehicle

👥 Seats

🛡 Safety

🎙 Audio

📍 Route

🦋 Network activation

Do not introduce a completely different visual style.

==================================================

14. IMPORTANT IMPLEMENTATION RULE

==================================================

This is a hackathon MVP.

If real map APIs, microphone permissions, authentication or location services are not configured, create a convincing SIMULATED INTERFACE instead of requiring external services.

The demo must still work smoothly.

The map can be simulated.

The audio recording can be simulated.

The ride data can be simulated.

Do not add login, payment, real user accounts, or unnecessary features.

Most importantly:

DO NOT BREAK ANY OF THE EXISTING FellaFlow PAGES OR NAVIGATION.

The final product should feel like one cohesive "Community Activation Engine", not a collection of unrelated features.

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://ripple-ride-hub.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/2e7028f4-5c43-4043-bffe-e59765604313).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
