import {
  Card,
  Button,
  Grid,
  Group,
  Text,
  Image,
  Flex,
  createStyles,
  Title,
} from "@mantine/core";
import { IconCloudUpload } from "@tabler/icons";

import { profilePicGuide } from "../data";

const useStyles = createStyles((theme, _params) => {
  return {
    cardBody: {
      padding: `${theme.spacing.xs}px ${theme.spacing.sm}px`,
      height: "70vh",
      marginBottom: "10px",
      // "& img": {
      //   height: "70vh",
      // },
    },
    btn: {
      fontWeight: 500,
    },
    guideTitle: {
      fontWeight: 900,
      marginBottom: theme.spacing.md * 1.5,
    },
    guideBody: {
      fontWeight: 100,
      "& p": {
        margin: 0,
        fontSize: "13px",
        borderBottom: "1px solid gainsboro",
        paddingBottom: "10px",
        width: "100%",
      },
    },
  };
});

const Home = () => {
  const { classes } = useStyles();

  return (
    <Grid>
      <Grid.Col span={8}>
        <Card shadow="sm" p="lg" radius="md" withBorder>
          <Card.Section withBorder inheritPadding py="xs">
            <Group position="apart">
              <Text weight={800} size="xl">
                Profile picture
              </Text>
            </Group>
            <Group position="apart">
              <Text weight={200} color="gray">
                Capture or choose a picture from your device.
              </Text>
            </Group>
          </Card.Section>
          <Card.Section className={classes.cardBody}>
            <Image
              src="https://images.unsplash.com/photo-1527004013197-933c4bb611b3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=720&q=80"
              alt="Norway"
            />
          </Card.Section>

          <Flex justify="space-between" align="center" direction="row">
            <Flex
              justify="space-between"
              align="center"
              direction="row"
              gap={10}
            >
              <Button
                variant="filled"
                color="violet"
                className={classes.btn}
                size="sm"
                mt="md"
                radius="xl"
              >
                Capture picture
              </Button>
              <Button
                variant="outline"
                color="violet"
                className={classes.btn}
                size="sm"
                mt="md"
                radius="xl"
              >
                Choose Picture
              </Button>
            </Flex>
            <Button
              variant="filled"
              color="violet"
              className={classes.btn}
              size="sm"
              mt="md"
              radius="xl"
              leftIcon={<IconCloudUpload size={20} />}
            >
              Upload
            </Button>
          </Flex>
        </Card>
      </Grid.Col>
      <Grid.Col span={4}>
        <Card withBorder shadow="sm" radius="md">
          <Card.Section withBorder inheritPadding py="xs">
            <Group className={classes.guideTitle} position="apart">
              <Text>Profile picture Guide</Text>
            </Group>
            <Group position="apart" className={classes.guideBody}>
              {profilePicGuide.map(({ title, content }) => (
                <p>
                  <Text span c="gray" inherit>
                    {title}
                  </Text>
                  {content}
                </p>
              ))}
            </Group>
          </Card.Section>
        </Card>
      </Grid.Col>
    </Grid>
  );
};

export default Home;
