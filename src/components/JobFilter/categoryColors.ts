import { teal, red, yellow } from "@mui/material/colors";

export const categoryColors: {
  [key: number]: { name: string; color: string };
} = {
  1: { name: "Bookmarked", color: "#ffffff" },
  2: { name: "Applied", color: teal[100] },
  3: { name: "Interviewing", color: teal[400] },
  4: { name: "Interviewed", color: teal[800] },
  5: { name: "Job Offer", color: yellow[600] },
  6: { name: "Job Unavailable", color: red[900] },
};
