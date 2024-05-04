import { EmailIcon } from "@chakra-ui/icons";
import { Box, Button, Show, useColorModeValue } from "@chakra-ui/react";

const ContactUsComponent = () => {
  const hoverBg = useColorModeValue("gray.100", "gray.600");

  return (
    <div>
      {/* <Show above="768px">
        <Button
          transition="color 0.2s, text-decoration 0.2s"
          _hover={{
            textDecoration: "underline",
          }}
          leftIcon={<EmailIcon />}
          variant="ghost"
        >
          Contact Us
        </Button>
      </Show>
      <Show below="767px">
        <Box
          p="1"
          transition="background-color 0.3s"
          borderRadius="md"
          _hover={{
            backgroundColor: hoverBg, // Changes background color on hover
          }}
        >
          <EmailIcon boxSize={"20px"} />
        </Box>
      </Show> */}
      <Button
        transition="color 0.2s, text-decoration 0.2s"
        _hover={{
          textDecoration: "underline",
          color: "rgba(101, 163, 60, 1)",
        }}
        leftIcon={<EmailIcon />}
        variant="ghost"
        color={"white"}
      >
        Contact Us
      </Button>
    </div>
  );
};

export default ContactUsComponent;
