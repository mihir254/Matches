import { Button, Box, Flex, Heading, Icon, Input, Text, Modal, ModalCloseButton, ModalContent, ModalOverlay, Tooltip } from "@chakra-ui/react";
import { Inter } from "next/font/google";
import { ChangeEvent, useState } from "react";
import Method from "./games";
import Cost from "./cost";
import { FaFacebookF } from "react-icons/fa6";
import Form from "./form";
import Draws from "./draws";
import { SlQuestion } from "react-icons/sl";
import { info } from "console";

const inter = Inter({ subsets: ["latin"] });

const initialForm = {
	fee: '',
	studentFee: '',
	teams: '',
	studentTeams: '',
	groups: '',
	minGames: '',
	ballCost: '',
	trophyCost: '',
	otherExpenses: '',
}

const Home = () => {
	const [formValues, setFormValues] = useState (initialForm);
	const [page, setPage] = useState <string> ("estimate");
	const [info, setInfo] = useState <string> ('');

	const updateInput = (event: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = event.target;
		const numericValue = value === "" ? "" : Number(value) < 0 ? 0 : Number(value);
        setFormValues((prev) => {
            return {
                ...prev,
                [name]: numericValue,
            }
        });
    }

	return (
		<Flex p={{ base: 8, lg: 12}} py={{ base: 20, lg: 32}} gap={"30px"} wrap={"wrap"} minHeight={"100vh"}
			justifyContent={"center"} alignItems={"start"} fontSize={{ base: "10px", sm: "15px"}}>
			
			<Flex position={"absolute"} top={0} height={"50px"}>
				<Flex cursor={"pointer"} _hover={{ textDecoration: "underline" }} border={"2px solid steelblue"}
					onClick={() => setPage("estimate")} bgColor={page==="estimate" ? "steelblue" : "transparent"}
					color={page==="estimate" ? "ghostwhite" : "steelblue"} width={"50vw"} justifyContent={"center"} alignItems={"center"}>
						<Heading size={{base: "xs", lg: "md"}} fontFamily={"monospace"}>ESTIMATE</Heading>
				</Flex>
				<Flex cursor={"pointer"} _hover={{ textDecoration: "underline" }} border={"2px solid steelblue"}
					onClick={() => setPage("draws")} bgColor={page==="draws" ? "steelblue" : "transparent"}
					color={page==="draws" ? "ghostwhite" : "steelblue"} width={"50vw"} justifyContent={"center"} alignItems={"center"}>
						<Heading size={{base: "xs", lg: "md"}} fontFamily={"monospace"}>DRAWS</Heading>
				</Flex>
			</Flex>

			{page === "estimate" && <Form updateInput={updateInput} formValues={formValues}/>}

			{page === "estimate" && <Flex bgColor="whitesmoke" rounded={"md"} p={{base: 5, lg: 10}} shadow={"sm"} justifyContent={"space-evenly"}
				gap={"20px"} display={Number(formValues.teams) + Number(formValues.studentTeams) > 3 ? "flex" : "none"} position={"relative"}>
				<Flex position={"absolute"} top={{base: -2, md: -5}} left={5} right={0} height="2px" bgColor="transparent">
					<Heading size={{ base: "sm", md: "lg" }} color={"steelblue"}>GAMES</Heading>
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

				<Flex direction={"column"} gap={"30px"}>
					<Heading size={{base: "xxs", md: "sm"}} color={"transparent"}>COLUMNS</Heading>
					<Flex whiteSpace={"nowrap"} direction={"column"} gap={"20px"}>
						<Text>Teams</Text>
						<Text>Groups</Text>
						<Text>Match / Team</Text>
						<Text>Group Stage</Text>
						<Text>Total Matches</Text>
						<Flex direction={"row"} alignItems={"center"}>
							<Text mr={2}>Total Time</Text>
							<Tooltip hasArrow label="Time required to conduct all games on 1 ground">
								<span><SlQuestion color="darkgreen" cursor={"pointer"} onClick={() => setInfo("Total Time : Time required to conduct all games on 1 ground. Divide it by number of grounds to calculate time for concurrent games.")}/></span>
							</Tooltip>
						</Flex>
						<Text>Balls Required</Text>
						<Text>Extra Balls</Text>
					</Flex>
				</Flex>
				<Method
					name="KNOCKOUT"
					teams={Number(formValues.teams)}
					studentTeams={Number(formValues.studentTeams)}
					fees={Number(formValues.fee)}
					studentFees={Number(formValues.studentFee)}
					groups={Number(formValues.groups)}
					minGames={Number(formValues.minGames)}
					ballCost={Number(formValues.ballCost)}
					trophyCost={Number(formValues.trophyCost)}
					misc={Number(formValues.otherExpenses)}
				/>
				<Method
					name="ROUND ROBIN"
					teams={Number(formValues.teams)}
					studentTeams={Number(formValues.studentTeams)}
					fees={Number(formValues.fee)}
					studentFees={Number(formValues.studentFee)}
					groups={Number(formValues.groups)}
					minGames={Number(formValues.minGames)}
					ballCost={Number(formValues.ballCost)}
					trophyCost={Number(formValues.trophyCost)}
					misc={Number(formValues.otherExpenses)}
				/>
			</Flex>}

			{page === "estimate" && <Flex bgColor="whitesmoke" rounded={"md"} p={{base: 5, lg: 10}} shadow={"sm"} justifyContent={"space-evenly"}
				gap={"20px"} display={Number(formValues.teams) + Number(formValues.studentTeams) > 3 ? "flex" : "none"} position={"relative"}>
				<Flex position={"absolute"} top={{base: -2, md: -5}} left={5} right={0} height="2px" bgColor="transparent">
					<Heading size={{ base: "sm", md: "lg" }} color={"steelblue"}>FINANCE</Heading>
					<Box mt={{base: 2, md: 5}} mx={2} flex="1" height="2px" bgColor="steelblue" />
				</Flex>
				<Flex direction={"column"} gap={"30px"}>
					<Heading size={{base: "xxs", md: "sm"}} color={"transparent"}>COLUMNS</Heading>
					<Flex whiteSpace={"nowrap"} direction={"column"} gap={"20px"}>
						<Text>Balls</Text>
						<Text>Trophies</Text>
						<Text>Other Expenses</Text>
						<Text>Total Spent</Text>
						<Text>Total Collected</Text>
						<Text>Total Saved</Text>
					</Flex>
				</Flex>
				<Cost
					name="KNOCKOUT"
					teams={Number(formValues.teams)}
					studentTeams={Number(formValues.studentTeams)}
					fees={Number(formValues.fee)}
					studentFees={Number(formValues.studentFee)}
					groups={Number(formValues.groups)}
					minGames={Number(formValues.minGames)}
					ballCost={Number(formValues.ballCost)}
					trophyCost={Number(formValues.trophyCost)}
					misc={Number(formValues.otherExpenses)}
				/>
				<Cost
					name="ROUND ROBIN"
					teams={Number(formValues.teams)}
					studentTeams={Number(formValues.studentTeams)}
					fees={Number(formValues.fee)}
					studentFees={Number(formValues.studentFee)}
					groups={Number(formValues.groups)}
					minGames={Number(formValues.minGames)}
					ballCost={Number(formValues.ballCost)}
					trophyCost={Number(formValues.trophyCost)}
					misc={Number(formValues.otherExpenses)}
				/>
			</Flex>}
			
			{page === "draws" && <Draws />}
			<Flex position={"absolute"} bottom={0} height={"50px"} width={"100vw"} bgColor={"steelblue"} 
				justifyContent={"space-evenly"} alignItems={"center"} color={"ghostwhite"}>
				<Heading cursor={"pointer"} size={{base: "xs", lg: "md"}} fontFamily={"monospace"} _hover={{ textDecoration: "underline" }}
					onClick={() => window.open("https://www.facebook.com/BuffaloBulldozersCricketClub/", "_blank", 'noopener,noreferrer')}>
						@2024 BUFFALO BULLDOZERS
				</Heading>
				<Text color={"whitesmoke"} position={"absolute"} right={10}>v1.0.2</Text>
				{/* <Text>Developed by Mihir Bhansali</Text> */}
				{/* <FaFacebookF size={20} cursor={"pointer"}/> */}
			</Flex>
		</Flex>	
	);
}

export default Home;