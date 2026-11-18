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
      color: "#0B192C"
    },
    {
      id: "egypt",
      title: "Egypt",
      album: "New Single — Tremendous",
      src: "assets/audio/egypt.mp3",
      duration: 414, // 6:54
      cover: "assets/images/cover-tremendous.jpg",
      color: "#CBD5E1"
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
      photo: "assets/images/member-leysan.jpg",
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
