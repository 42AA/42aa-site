/* ==========================================================================
   42AA — Data Store: Tracks, Members, Group Photos, Social Links
   Palette:
   - Dark Navy Blue: #0B192C / #13243D
   - Light Gray: #E2E8F0 / #CBD5E1
   - Burgundy: #8B1E2D / #66111C / #A12638
   - Clean High-Contrast White: #FFFFFF
   - Zero Yellow Hues
   ========================================================================== */

window.BAND_DATA = {
  singleTitle: "New Single — Tremendous",

  tracks: [
    {
      id: "elephant",
      title: "Elephant",
      album: "New Single — Tremendous",
      src: "assets/audio/elephant.mp3",
      duration: 152, // 2:32
      cover: "assets/images/cover-tremendous.jpg",
      slonCutout: "assets/images/slon-elephant-cutout.png",
      color: "#0B192C",
      lyrics: {
        title: "Elephant",
        sections: [
          {
            type: "Verse",
            lines: [
              { time: 72.75, text: "Gigantic trunk" },
              { time: 75.75, text: "Loads of meat" },
              { time: 77.0, text: "( Ju-juggernaut, ju-juggernaut )", isBacking: true },
              { time: 79.5, text: "Atomic damage" },
              { time: 82.0, text: "Caused by your feet" },
              { time: 83.5, text: "( Ju-juggernaut, ju-juggernaut )", isBacking: true },
              { time: 86.0, text: "Enormous mind" },
              { time: 89.0, text: "Tremendous steps" },
              { time: 91.0, text: "( Ju-juggernaut, ju-juggernaut )", isBacking: true },
              { time: 92.75, text: "Your orange sockets" },
              { time: 96.0, text: "Lead me to death" },
              { time: 97.0, text: "( Ju-juggernaut, ju-juggernaut )", isBacking: true },
              { time: 99.5, text: "Your call will make their ears bleed" },
              { time: 106.5, text: "Your call will attract me" },
              { time: 111.0, text: "( Ju-juggernaut, ju-juggernaut )", isBacking: true },
              { time: 113.0, text: "Your call has drawn the best ones" },
              { time: 120.0, text: "Pissed others off excessively" },
              { time: 124.0, text: "( Ju-juggernaut, ju-juggerna-ha-haut )", isBacking: true }
            ]
          }
        ]
      }
    },
    {
      id: "egypt",
      title: "Egypt",
      album: "New Single — Tremendous",
      src: "assets/audio/egypt.mp3",
      duration: 414, // 6:54
      cover: "assets/images/cover-tremendous.jpg",
      slonCutout: "assets/images/slon-egypt-cutout.png",
      color: "#CBD5E1",
      lyrics: {
        title: "Egypt",
        sections: [
          {
            type: "Verse",
            lines: [
              { time: 55.0, text: "I see long streaks of ( Coral ) coral" },
              { time: 62.0, text: "I see a crab in the sky ( Crab in the sky )" },
              { time: 68.0, text: "I see manta rays, UFOs" },
              { time: 72.3, text: "You can too, if you try" },
              { time: 75.8, text: "When I spot those fish in the sky" },
              { time: 82.0, text: "I'm gonna tell everybody the truth" },
              { time: 90.5, text: "Intergalactic pork-a train" },
              { time: 93.0, text: "Coming straight to you" }
            ]
          },
          {
            type: "Verse",
            lines: [
              { time: 139.0, text: "Do you think sacred geometry ( Geometry )" },
              { time: 143.7, text: "Is anything other than godly?" },
              { time: 149.0, text: "There's something up there" },
              { time: 154.0, text: "So you just need to trust me" }
            ]
          },
          {
            type: "Chorus",
            lines: [
              { time: 202.5, text: "Aliens in Egypt" },
              { time: 206.5, text: "Ah, there were aliens in Egypt" },
              { time: 214.0, text: "Aliens in Egypt" },
              { time: 219.0, text: "There'll be aliens in Egypt" },
              { time: 225.0, text: "Aliens in Egypt" },
              { time: 237.0, text: "There were aliens in Egypt" },
              { time: 242.0, text: "There were aliens in Egypt" },
              { time: 248.0, text: "Aliens" },
              { time: 252.0, text: "Aliens" },
              { time: 260.0, text: "Aliens in Egypt" },
              { time: 267.0, text: "Aliens, aliens, aliens, aliens, aliens, aliens, aliens, aliens" },
              { time: 288.0, text: "Aliens" }
            ]
          },
          {
            type: "Bridge",
            lines: [
              { time: 294.0, text: "Cha-cha-cha" }
            ]
          }
        ]
      }
    }
  ],

  members: [
    {
      name: "Manannikova Glafira",
      role: "vocals, keys, guitar",
      photo: "assets/images/member-glafira.jpg",
      accent: "#8B1E2D"
    },
    {
      name: "Denisov Timofey",
      role: "bass, saxophone",
      photo: "assets/images/member-timofey.jpg",
      accent: "#0B192C"
    },
    {
      name: "Adamowicz Leisan",
      role: "vocals, guitar",
      photo: "assets/images/member-leysan-2.jpg?v=16",
      accent: "#8B1E2D"
    },
    {
      name: "Beriev Igor",
      role: "drums",
      photo: "assets/images/member-igor.jpg",
      accent: "#0B192C"
    }
  ],

  photos: [
    { src: "assets/images/group-1.jpg", span: "wide" },
    { src: "assets/images/group-2.jpg", span: "tall" },
    { src: "assets/images/group-3.jpg", span: "normal" },
    { src: "assets/images/group-4.jpg", span: "normal" }
  ],

  socials: [
    {
      name: "Telegram",
      url: "https://t.me/we_are_42AA",
      color: "#1E3E62",
      icon: "telegram"
    },
    {
      name: "Instagram",
      url: "https://www.instagram.com/42aaband",
      color: "#8B1E2D",
      icon: "instagram"
    },
    {
      name: "YouTube",
      url: "https://youtube.com/@42_aa?si=XjieXTo2Y0fF2dw-",
      color: "#66111C",
      icon: "youtube"
    },
    {
      name: "Bandcamp",
      url: "https://42aa.bandcamp.com/album/tremendous",
      color: "#0B192C",
      icon: "bandcamp"
    },
    {
      name: "Apple Music",
      url: "https://music.apple.com/ru/album/6819606914",
      color: "#8B1E2D",
      icon: "apple"
    },
    {
      name: "Spotify",
      url: "https://open.spotify.com/album/39S4UTcTRiWxEa43x3Ou8C",
      color: "#1E3E62",
      icon: "spotify"
    }
  ]
};
