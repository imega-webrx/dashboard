import React from "react";
import {
    AppBar,
    IconButton,
    Toolbar,
    Drawer, List, ListItemButton, ListItemText, Collapse, Box, CssBaseline
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu"
import {ExpandLess, ExpandMore} from "@mui/icons-material";
import StartPage from "./StartPage";
import DrugEditor from "./DrugEditor";


const drawerWidth = 250

export default function MainApp() {
    const testData = [
        {
            name: "Категория раз",
            drugs: [
                {
                    name: "Лекарство 1"
                },
                {
                    name: "Лекарство 2"
                },
                {
                    name: "Лекарство 3"
                },
                {
                    name: "Лекарство 4"
                },
                {
                    name: "Лекарство 5"
                },
            ]
        },
        {
            name: "Категория два",
            drugs: [
                {
                    name: "Лекарство 1"
                },
                {
                    name: "Лекарство 2"
                },
                {
                    name: "Лекарство 3"
                },
                {
                    name: "Лекарство 4"
                },
                {
                    name: "Лекарство 5"
                },
            ]
        }
    ]

    const [openedCategory, setOpenedCategory] = React.useState("")
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const [selectedDrug, setSelectedDrug] = React.useState("")
    const [currentView, setCurrentView] = React.useState(<StartPage/>)


    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const handleCategoryClick = (name) => {
        if (openedCategory === name) {
            setOpenedCategory("")
            setCurrentView(<StartPage/>)
        } else {
            setOpenedCategory(name)
        }
    }

    const handleDrugClick = (name) => {
        setSelectedDrug(name)
        setCurrentView(<DrugEditor category={openedCategory} drug={name}/>)
    }

    const list = (
        <div>
            <List>
                {testData.map((item) => {
                    return(
                        <div>
                        <ListItemButton onClick={() => handleCategoryClick(item.name)}>
                            <ListItemText primary={item.name}/>

                            {(openedCategory === item.name) ? <ExpandLess/> : <ExpandMore/>}
                        </ListItemButton>
                        <Collapse in={(openedCategory === item.name)} timeout={"auto"} unmountOnExit>
                            <List component={"div"} disablePadding>
                                {item.drugs.map((drug) => (
                                    <ListItemButton sx={{ pl: 4 }} onClick={() => handleDrugClick(drug.name)}>
                                        <ListItemText primary={drug.name}/>
                                    </ListItemButton>
                                ))}
                            </List>
                        </Collapse>
                        </div>

                    )
                })}
            </List>
        </div>
    )
    const container = window !== undefined ? () => window.document.body : undefined;

    return(
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
              <AppBar
                position="fixed"
                sx={{
                  width: { sm: 0 },
                  ml: { sm: 0 },
                    height: {sm: 0},
                    display: {sm: 'none'},
                }}
              >
                <Toolbar>
                  <IconButton
                    color="inherit"
                    edge="start"
                    onClick={handleDrawerToggle}
                    sx={{ mr: 2, display: { sm: 'none' } }}
                  >
                    <MenuIcon />
                  </IconButton>
                </Toolbar>
              </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      >
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {list}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          {list}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
      >
        <Toolbar sx={{display: {sm: 'none'}, position: {sm: 'absolute'}}}/>
          {currentView}
      </Box>
    </Box>
  );
}