import { Flex, Heading, Input, Text, Box, Tooltip, Modal, ModalOverlay, ModalContent, ModalCloseButton } from '@chakra-ui/react';
import { ChangeEvent, useState } from "react";
import { SlQuestion } from "react-icons/sl";

type FormType = {
    fee: string;
    studentFee: string;
    teams: string;
    studentTeams: string;
    groups: string;
    minGames: string;
    ballCost: string;
    trophyCost: string;
    otherExpenses: string;
}

type PropType = {
    updateInput: (event: ChangeEvent<HTMLInputElement>) => void,
    formValues: FormType,
}

export const Form = (props: PropType) => {
    const { updateInput, formValues } = props;
    const [info, setInfo] = useState <string> ('');

    return (
        formValues && <Flex id="form" direction={"column"} bgColor="whitesmoke" rounded={"md"} p={{base: 5, lg: 10}} fontSize={{ base: "12px", sm: "15px"}}
            gap={"15px"} shadow={"sm"} justifyContent={"center"} alignItems={"center"} position={"relative"}>
            <Flex position={"absolute"} top={{base: -2, md: -5}} left={5} right={0} height="2px" bgColor="transparent">
                <Heading size={{ base: "sm", md: "lg" }} color={"steelblue"}>INFO</Heading>
                <Box mt={{base: 2, md: 5}} mx={2} flex="1" height="2px" bgColor="steelblue" />
            </Flex>

            <Modal blockScrollOnMount={false} isOpen={info !== ''} onClose={() => setInfo('')} isCentered>
                <ModalOverlay
                    bg='blackAlpha.500'
                />
                <ModalContent m={10} bgColor={"whitesmoke"}>
                    <Flex direction={"column"} p={5} justifyContent={"center"} alignItems={"center"}>
                        <Heading mb={2} size={{ base: "sm", md: "lg" }}>{info.split(" : ")[0]}</Heading>
                        <Text textAlign={"center"}>{info.split(" : ")[1]}</Text>
                    </Flex>
                    <ModalCloseButton />
                </ModalContent>
            </Modal>

            <Flex alignItems={"center"} justifyContent={"space-between"} width={"100%"}>
                <Flex mx={5} alignItems={"center"}>
                    <Text mr={2}>Normal Teams</Text>
                    <Tooltip hasArrow label="Teams charged without student discounts">
                        <span><SlQuestion color="darkgreen" cursor={"pointer"} onClick={() => setInfo("Normal Teams : Teams charged without student discounts")}/></span>
                    </Tooltip>
                </Flex>
                <Input type="number" width={"120px"} name="teams" value={formValues.teams} onChange={updateInput}/>
            </Flex>
            <Flex alignItems={"center"} justifyContent={"space-between"} width={"100%"}>
                <Text mx={5}>Normal Team Fee ($)</Text>
                <Input type="number" width={"120px"} name="fee" value={formValues.fee} onChange={updateInput}/>
            </Flex>
            <Flex alignItems={"center"} justifyContent={"space-between"} width={"100%"}>
                <Flex mx={5} alignItems={"center"}>
                    <Text mr={2}>Student Teams</Text>
                    <Tooltip hasArrow label="Student teams with subsidised rates">
                        <span><SlQuestion color="darkgreen" cursor={"pointer"} onClick={() => setInfo("Student Teams : Student teams with subsidised rates")}/></span>
                    </Tooltip>
                </Flex>
                <Input type="number" width={"120px"} name="studentTeams" value={formValues.studentTeams} onChange={updateInput}/>
            </Flex>
            <Flex alignItems={"center"} justifyContent={"space-between"} width={"100%"}>
                <Text mx={5}>Student Team Fee ($)</Text>
                <Input type="number" width={"120px"} name="studentFee" value={formValues.studentFee} onChange={updateInput}/>
            </Flex>
            <Flex alignItems={"center"} justifyContent={"space-between"} width={"100%"}>
                <Text mx={5}>Groups</Text>
                <Input type="number" width={"120px"} name="groups" value={formValues.groups} onChange={updateInput}/>
            </Flex>
            <Flex alignItems={"center"} justifyContent={"space-between"} width={"100%"}>
                <Text mx={5}>Cost / Ball ($)</Text>
                <Input type="number" width={"120px"} name="ballCost" value={formValues.ballCost} onChange={updateInput}/>
            </Flex>
            <Flex alignItems={"center"} justifyContent={"space-between"} width={"100%"}>
                <Text mx={5}>Trophies Cost ($)</Text>
                <Input type="number" width={"120px"} name="trophyCost" value={formValues.trophyCost} onChange={updateInput}/>
            </Flex>
            <Flex alignItems={"center"} justifyContent={"space-between"} width={"100%"}>
                <Text mx={5}>Other Expenses ($)</Text>
                <Input type="number" width={"120px"} name="otherExpenses" value={formValues.otherExpenses} onChange={updateInput}/>
            </Flex>
            <Flex alignItems={"center"} justifyContent={"space-between"} width={"100%"}>
                <Flex mx={5} alignItems={"center"}>
                    <Text mr={2}>Group Games</Text>
                    <Tooltip hasArrow label="If required, you can add number of group games each team plays. Set to Round Robin by default">
                        <span><SlQuestion color="darkgreen" cursor={"pointer"} onClick={() => setInfo("Group Games : If required, you can add number of group games each team plays. Standard Round Robin by default")}/></span>
                    </Tooltip>
                </Flex>
                <Input type="number" width={"120px"} name="minGames" value={formValues.minGames} onChange={updateInput}/>
            </Flex>
        </Flex>
    )
}

export default Form;