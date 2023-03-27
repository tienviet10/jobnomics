import { teal, red } from "@mui/material/colors";

export const categoryColors: {
  [key: number]: { name: string; color: string };
} = {
  1: { name: "Bookmarked", color: "#ffffff" },
  2: { name: "Applied", color: teal[50] },
  3: { name: "Interviewing", color: teal[300] },
  4: { name: "Interviewed", color: teal[600] },
  5: { name: "Job Offer", color: teal[900] },
  6: { name: "Job Unavailable", color: red[900] },
};
