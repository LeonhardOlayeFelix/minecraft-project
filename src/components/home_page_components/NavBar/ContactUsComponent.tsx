import { EmailIcon } from "@chakra-ui/icons";
import { Box, Button, Show, useColorModeValue } from "@chakra-ui/react";

const ContactUsComponent = () => {
  const hoverBg = useColorModeValue("gray.100", "gray.600");

  return (
    <div>
      <Show above="768px">
        <Button leftIcon={<EmailIcon />} variant="ghost">
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
      </Show>
    </div>
  );
};

export default ContactUsComponent;
