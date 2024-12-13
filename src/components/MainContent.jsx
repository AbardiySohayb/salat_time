import Grid from "@mui/material/Grid2";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import Prayer from "./Prayer";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import axios from "axios";
import { useState, useEffect } from "react";
import moment from "moment";
import "moment/dist/locale/fr";
import CircularProgress from "@mui/material/CircularProgress";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

moment.locale("fr");

export default function MainContent() {
  const [isLoading, setIsLoading] = useState(true);

  const getTiming = async () => {
    const data = await axios.get(
      `https://api.aladhan.com/v1/timingsByCity?country=MAR&city=${ville}`
    );
    SetTimings(data.data.data.timings);
    setIsLoading(false);
  };
  const oldVille = localStorage.getItem("city");
  const [ville, setVille] = useState(oldVille || "FES");
  const [jour, setJour] = useState(null);

  const [timings, SetTimings] = useState({
    Fajr: "06:23",
    Dhuhr: "13:36",
    Asr: "16:23",
    Maghrib: "19:49",
    Isha: "20:39",
  });

  const nextP = () => {
    const timeNow = moment();
    let nextPrayer = null;
    let timeNextP = null;

    if (
      timeNow.isAfter(moment(timings["Fajr"], "hh:mm")) &&
      timeNow.isBefore(moment(timings["Dhuhr"], "hh:mm"))
    ) {
      nextPrayer = "Dhuhr";
      timeNextP = timings.Dhuhr;
    } else if (
      timeNow.isAfter(moment(timings["Dhuhr"], "hh:mm")) &&
      timeNow.isBefore(moment(timings["Asr"], "hh:mm"))
    ) {
      nextPrayer = "Asr";
      timeNextP = timings.Asr;
    } else if (
      timeNow.isAfter(moment(timings["Asr"], "hh:mm")) &&
      timeNow.isBefore(moment(timings["Maghrib"], "hh:mm"))
    ) {
      nextPrayer = "Maghrib";
      timeNextP = timings.Maghrib;
    } else if (
      timeNow.isAfter(moment(timings["Maghrib"], "hh:mm")) &&
      timeNow.isBefore(moment(timings["Isha"], "hh:mm"))
    ) {
      nextPrayer = "Isha";
      timeNextP = timings.Isha;
    } else {
      nextPrayer = "Fajr";
      timeNextP = timings.Fajr;
    }

    setPrayerNext(nextPrayer);

    let heurediff = moment(timeNextP, "hh:mm").diff(timeNow, "hours");
    let minutediff = moment(timeNextP, "hh:mm").diff(timeNow, "minutes") % 60;
    let secondediff = moment(timeNextP, "hh:mm").diff(timeNow, "seconds") % 60;

    if (heurediff < 0 || minutediff < 0 || secondediff < 0) {
      heurediff += 23;
      minutediff += 59;
      secondediff += 59;
    }

    const timeAfficher = `${heurediff.toString().padStart(2, "0")}:${minutediff
      .toString()
      .padStart(2, "0")}:${secondediff.toString().padStart(2, "0")}`;
    setTimeNext(timeAfficher);
  };

  const [prayerNext, setPrayerNext] = useState(null);
  const [timeNext, setTimeNext] = useState(null);
  const [modee,setMode] = useState("light");

  useEffect(() => {
    setJour(moment().format("MMMM Do YYYY | h:mm a"));
  }, [timeNext]);

  useEffect(() => {
    getTiming();
  }, [ville]);

  useEffect(() => {
    nextP();
    let interval = setInterval(() => {
      nextP();
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [timings]);
  const handleChange = (event) => {
    setVille(event.target.value);
    localStorage.setItem("city", event.target.value);
  };

  const villesMaroc = [
    "Casablanca",
    "Fès",
    "Marrakech",
    "Tangier",
    "Sale",
    "Rabat",
    "Meknès",
    "Oujda-Angad",
    "Kenitra",
    "Agadir",
    "Tétouan",
    "Taourirt",
    "Temara",
    "Safi",
    "Khénifra",
    "El Jadid",
    "Laâyoune",
    "Mohammedia",
    "Kouribga",
    "Béni Mellal",
    "Ait Melloul",
    "Nador",
    "Taza",
    "Settat",
    "Barrechid",
    "Al Khmissat",
    "Inezgane",
    "Ksar El Kebir",
    "My Drarga",
    "Larache",
    "Guelmim",
    "Berkane",
    "Ad Dakhla",
    "Bouskoura",
    "Al Fqih Ben Çalah",
    "Oued Zem",
    "Sidi Slimane",
    "Errachidia",
    "Guercif",
    "Oulad Teïma",
    "Ben Guerir",
    "Sefrou",
    "Fnidq",
    "Sidi Qacem",
    "Tiznit",
    "Moulay Abdallah",
    "Youssoufia",
    "Martil",
    "Aïn Harrouda",
    "Souq Sebt Oulad Nemma",
    "Skhirate",
    "Ouezzane",
    "Sidi Yahya Zaer",
    "Al Hoceïma",
    "M’diq",
    "Midalt",
    "Azrou",
    "El Kelaa des Srarhna",
    "Ain El Aouda",
    "Beni Yakhlef",
    "Ad Darwa",
    "Al Aaroui",
    "Qasbat Tadla",
    "Boujad",
    "Jerada",
    "Mrirt",
    "El Aïoun",
    "Azemmour",
    "Temsia",
    "Zagora",
    "Ait Ourir",
    "Aziylal",
    "Sidi Yahia El Gharb",
    "Biougra",
    "Zaïo",
    "Aguelmous",
    "El Hajeb",
    "Zeghanghane",
    "Imzouren",
    "Tit Mellil",
    "Mechraa Bel Ksiri",
    "Al ’Attawia",
    "Demnat",
    "Arfoud",
    "Tameslouht",
    "Bou Arfa",
    "Sidi Smai’il",
    "Souk et Tnine Jorf el Mellah",
    "Mehdya",
    "Aïn Taoujdat",
    "Chichaoua",
    "Tahla",
    "Oulad Yaïch",
    "Moulay Bousselham",
    "Iheddadene",
    "Missour",
    "Zawyat ech Cheïkh",
    "Bouknadel",
    "Oulad Tayeb",
    "Oulad Barhil",
    "Bir Jdid",
    "Tifariti",
    "Taghjijt",
    "Bouizakarne",
  ];

  console.log(villesMaroc);
  const darkTheme = createTheme({
    palette: {
      mode: modee,
    },
  });
  return (
    <>
      {isLoading ? (
        <ThemeProvider theme={darkTheme}>
          <CssBaseline />
          <Stack direction="row" justifyContent="space-around">
            <CircularProgress />
          </Stack>
        </ThemeProvider>
      ) : (
        <ThemeProvider theme={darkTheme}>
          <Grid container>
            <Grid size={{ xs: 12, md: 6 }}>
              <div>
                <h2>{jour}</h2>
                <h1>{ville}</h1>
              </div>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <h2>Next is {prayerNext}</h2>
              <h1>{timeNext}</h1>
            </Grid>
          </Grid>

          <Divider />

          <Stack
            direction="row"
            justifyContent={"center"}
            style={{ marginTop: "50px" }}
          >
            <FormControl style={{ width: "25%" }}>
              <InputLabel id="demo-simple-select-label">Ville</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="ville"
                value={ville}
                onChange={handleChange}
              >
                {villesMaroc.map((ville) => (
                  <MenuItem key={ville} value={ville.toUpperCase()}>
                    {ville}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Stack>

          <Stack
            direction={{ xs: "column", md: "row" }}
            justifyContent="space-around"
            alignItems={"center"}
            style={{ marginTop: "50px" }}
          >
            <Prayer
              name="Fajr"
              time={timings.Fajr}
              image="https://i.pinimg.com/1200x/20/f5/6b/20f56b3adff9d07748fcfca271033e3d.jpg"
            />
            <Prayer
              name="DOHR"
              time={timings.Dhuhr}
              image="https://i.pinimg.com/1200x/20/f5/6b/20f56b3adff9d07748fcfca271033e3d.jpg"
            />
            <Prayer
              name="AASR"
              time={timings.Asr}
              image="https://i.pinimg.com/1200x/20/f5/6b/20f56b3adff9d07748fcfca271033e3d.jpg"
            />
            <Prayer
              name="MAGHREB"
              time={timings.Maghrib}
              image="https://i.pinimg.com/1200x/20/f5/6b/20f56b3adff9d07748fcfca271033e3d.jpg"
            />
            <Prayer
              name="3ICHAE"
              time={timings.Isha}
              image="https://i.pinimg.com/1200x/20/f5/6b/20f56b3adff9d07748fcfca271033e3d.jpg"
            />
          </Stack>

          <CssBaseline />
        </ThemeProvider>
      )}
    </>
  );
}
