import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import { Link as RouterLink } from "react-router-dom";

const PLACEHOLDER_APPS = [
  "Task Manager",
  "Application2",
  "Application3",
  "Application4",
  "Application5",
  "Application6",
];

export function Home() {
  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "background.default" }}>
      <Box
        component="header"
        sx={{
          py: 3,
          px: 2,
          borderBottom: 1,
          borderColor: "divider",
          bgcolor: "background.paper",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            flexWrap: "wrap",
            gap: 1,
          }}
        >
          <Box>
            <Typography variant="h5" component="h1" sx={{ fontWeight: 600 }}>
              HomeLab
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Choose an app to get started
            </Typography>
          </Box>
          <Link component={RouterLink} to="/">
            Back to login
          </Link>
        </Box>
      </Box>
      <Box sx={{ p: 3 }}>
        <Grid container spacing={3}>
          {PLACEHOLDER_APPS.map((name) => (
            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={name}>
              <Card
                variant="outlined"
                sx={{
                  height: "100%",
                  borderRadius: 2,
                  transition: "box-shadow 0.2s, border-color 0.2s",
                  "&:hover": {
                    boxShadow: 2,
                    borderColor: "primary.main",
                  },
                }}
              >
                <CardActionArea sx={{ height: "100%", display: "block" }}>
                  <CardContent sx={{ p: 3 }}>
                    <Typography variant="h6" component="h2" gutterBottom>
                      {name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Placeholder — coming soon
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
}
