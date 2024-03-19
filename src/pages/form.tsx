import { Flex, Heading, Input, Text, Box } from '@chakra-ui/react';
import { ChangeEvent } from "react";

type FormType = {
    fee: number;
    studentFee: number;
    teams: number;
    studentTeams: number;
    groups: number;
    minGames: number;
    ballCost: number;
    trophyCost: number;
    otherExpenses: number;
}

type PropType = {
    updateInput: (event: ChangeEvent<HTMLInputElement>) => void,
    formValues: FormType,
}

export const Form = (props: PropType) => {
    const { updateInput, formValues } = props;

    return (
        <Flex id="form" direction={"column"} bgColor="whitesmoke" rounded={"md"} p={{base: 5, lg: 10}} fontSize={{ base: "12px", sm: "15px"}}
            gap={"15px"} shadow={"sm"} justifyContent={"center"} alignItems={"center"} position={"relative"}>
            <Flex position={"absolute"} top={{base: -2, md: -5}} left={5} right={0} height="2px" bgColor="transparent">
                <Heading size={{ base: "sm", md: "lg" }} color={"steelblue"}>INFO</Heading>
                <Box mt={{base: 2, md: 5}} mx={2} flex="1" height="2px" bgColor="steelblue" />
            </Flex>
            <Flex alignItems={"center"}>
                <Text minWidth={"120px"} mx={5}>Normal Teams</Text>
                <Input type="number" width={"120px"} name="teams" value={formValues.teams} onChange={updateInput}/>
            </Flex>
            <Flex alignItems={"center"}>
                <Text minWidth={"120px"} mx={5}>Normal Fee ($)</Text>
                <Input type="number" width={"120px"} name="fee" value={formValues.fee} onChange={updateInput}/>
            </Flex>
            <Flex alignItems={"center"}>
                <Text minWidth={"120px"} mx={5}>Student Teams</Text>
                <Input type="number" width={"120px"} name="studentTeams" value={formValues.studentTeams} onChange={updateInput}/>
            </Flex>
            <Flex alignItems={"center"}>
                <Text minWidth={"120px"} mx={5}>Student Fee ($)</Text>
                <Input type="number" width={"120px"} name="studentFee" value={formValues.studentFee} onChange={updateInput}/>
            </Flex>
            <Flex alignItems={"center"}>
                <Text minWidth={"120px"} mx={5}>Groups</Text>
                <Input type="number" width={"120px"} name="groups" value={formValues.groups} onChange={updateInput}/>
            </Flex>
            <Flex alignItems={"center"}>
                <Text minWidth={"120px"} mx={5}>Cost / Ball ($)</Text>
                <Input type="number" width={"120px"} name="ballCost" value={formValues.ballCost} onChange={updateInput}/>
            </Flex>
            <Flex alignItems={"center"}>
                <Text minWidth={"120px"} mx={5}>Trophies Cost ($)</Text>
                <Input type="number" width={"120px"} name="trophyCost" value={formValues.trophyCost} onChange={updateInput}/>
            </Flex>
            <Flex alignItems={"center"}>
                <Text minWidth={"120px"} mx={5}>Other Expenses ($)</Text>
                <Input type="number" width={"120px"} name="otherExpenses" value={formValues.otherExpenses} onChange={updateInput}/>
            </Flex>
            <Flex alignItems={"center"}>
                <Text minWidth={"120px"} mx={5}>Change RR Games</Text>
                <Input type="number" width={"120px"} name="minGames" value={formValues.minGames} onChange={updateInput}/>
            </Flex>
        </Flex>
    )
}

export default Form;