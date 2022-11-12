import { useState } from "react";
import { createStyles, Navbar, Flex, Text } from "@mantine/core";
import {
  IconCalendarEvent,
  IconId,
  IconUser,
  IconLogout,
  IconUserCircle,
} from "@tabler/icons";

import { userInfo, brandName } from "../data";

const useStyles = createStyles((theme, _params, getRef) => {
  const icon = getRef("icon");
  return {
    navbar: {
      "@media (max-width: 800px)": {
        width: "12%",
        height: "100%",
        padding: "0",
        ".header": {
          padding: "5px",
        },
        ".brand-name": {
          display: "none",
        },
        "& span": {
          display: "none",
        },
        "& div > a ": {
          padding: "0",
        },
      },
    },
    header: {
      padding: `${theme.spacing.xs}px ${theme.spacing.sm}px`,
      paddingTop: theme.spacing.md * 1.5,
      marginBottom: theme.spacing.md * 1.5,
      borderBottom: `1px solid ${theme.colors.gray[2]}`,
    },

    body: {
      padding: `${theme.spacing.xs}px ${theme.spacing.sm}px`,
      marginBottom: theme.spacing.md * 1.5,
      "@media (max-width: 800px)": {
        padding: 0,
        paddingLeft: "10px",
        paddingTop: "10px",
      },
    },

    footer: {
      paddingTop: theme.spacing.md,
      marginTop: theme.spacing.md,
      borderTop: `1px solid ${theme.colors.gray[2]}`,
      "@media (max-width: 800px)": {
        display: "none",
      },
    },

    link: {
      ...theme.fn.focusStyles(),
      display: "flex",
      alignItems: "center",
      textDecoration: "none",
      fontSize: theme.fontSizes.sm,
      color: theme.colors.gray[7],
      padding: `${theme.spacing.xs}px ${theme.spacing.sm}px`,
      borderRadius: theme.radius.sm,
      fontWeight: 500,

      "&:hover": {
        backgroundColor: theme.colors.gray[0],
        color: theme.black,

        [`& .${icon}`]: {
          color: theme.black,
        },
      },
    },

    linkIcon: {
      ref: icon,
      color: theme.colors.gray[6],
      marginRight: theme.spacing.sm,
    },

    footerIcon: {
      ref: icon,
      color: theme.colors.dark[2],
    },

    linkActive: {
      "&, &:hover": {
        backgroundColor: theme.fn.variant({
          variant: "light",
          color: theme.primaryColor,
        }).background,
        color: theme.fn.variant({ variant: "light", color: theme.primaryColor })
          .color,
        [`& .${icon}`]: {
          color: theme.fn.variant({
            variant: "light",
            color: theme.primaryColor,
          }).color,
        },
      },
    },
    linkTitle: {
      letterSpacing: "2px",
      fontSize: "12px",
    },
  };
});

const classesLinks = [{ link: "", label: "Schedule", icon: IconCalendarEvent }];

const profileLinks = [
  { link: "", label: "About", icon: IconUser },
  { link: "", label: "Profile Picture", icon: IconId },
];

const Sidebar = () => {
  const { classes, cx } = useStyles();
  const [active, setActive] = useState("Billing");
  const { name, email } = userInfo;

  const getLinks = (data) =>
    data.map((item) => (
      <a
        className={cx(classes.link, {
          [classes.linkActive]: item.label === active,
        })}
        href={item.link}
        key={item.label}
        onClick={(event) => {
          event.preventDefault();
          setActive(item.label);
        }}
      >
        <item.icon className={classes.linkIcon} stroke={1.5} />
        <span>{item.label}</span>
      </a>
    ));

  return (
    <Navbar width={{ sm: 300, xs: 30 }} className={classes.navbar} p="md">
      <Navbar.Section className={cx(classes.header, "header")}>
        <Flex mih={50} justify="flex-start" align="center" direction="row">
          <img src="/assets/brand.svg" alt="My logo" />
          <brand />
          &nbsp;
          <Text size="xl" className="brand-name" weight={800}>
            {brandName}
          </Text>
        </Flex>
      </Navbar.Section>
      <Navbar.Section grow className={classes.body}>
        <a className={cx(classes.link)} href={null}>
          <span className={classes.linkTitle}>CLASSES</span>
        </a>
        {getLinks(classesLinks)}
        <a className={cx(classes.link)} href={null}>
          <span className={classes.linkTitle}>PROFILE</span>
        </a>
        {getLinks(profileLinks)}
      </Navbar.Section>
      <Navbar.Section className={cx(classes.footer, "footer")}>
        <Flex
          mih={50}
          justify="space-around"
          align="center"
          direction="row"
          wrap="wrap"
        >
          <IconUserCircle size={45} className={classes.footerIcon} stroke={1} />
          <Flex direction="column">
            <Text>{name}</Text>
            <Text lineClamp={1} size="sm" color="gray">
              {email}
            </Text>
          </Flex>
          <IconLogout size={25} className={classes.linkIcon} stroke={1.5} />
        </Flex>
      </Navbar.Section>
    </Navbar>
  );
};

export default Sidebar;
