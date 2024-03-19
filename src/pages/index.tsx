import { Button, Box, Flex, Heading, Icon, Input, Text } from "@chakra-ui/react";
import { Inter } from "next/font/google";
import { ChangeEvent, useState } from "react";
import Method from "./games";
import Cost from "./cost";
import { FaFacebookF } from "react-icons/fa6";
import Form from "./form";

const inter = Inter({ subsets: ["latin"] });

const initialForm = {
	fee: 0,
	studentFee: 0,
	teams: 0,
	studentTeams: 0,
	groups: 0,
	minGames: 0,
	ballCost: 0,
	trophyCost: 0,
	otherExpenses: 0,
}

const Home = () => {
	const [formValues, setFormValues] = useState (initialForm);

	const updateInput = (event: ChangeEvent<HTMLInputElement>) => {
        setFormValues((prev) => {
            return {
                ...prev,
                [event.target.name]: Number(event.target.value) >= 0 ? Number(event.target.value) : 0
            }
        })
    }

	return (
		<Flex p={{ base: 8, lg: 12}} gap={"30px"} wrap={"wrap"} minHeight={"calc(100vh - 50px)"}
			justifyContent={"center"} alignItems={"start"} fontSize={{ base: "10px", sm: "15px"}}>
			<Form updateInput={updateInput} formValues={formValues}/>
			<Flex bgColor="whitesmoke" rounded={"md"} p={{base: 5, lg: 10}} shadow={"sm"} justifyContent={"space-evenly"}
				gap={"20px"} display={formValues.teams + formValues.studentTeams > 3 ? "flex" : "none"} position={"relative"}>
				<Flex position={"absolute"} top={{base: -2, md: -5}} left={5} right={0} height="2px" bgColor="transparent">
					<Heading size={{ base: "sm", md: "lg" }} color={"steelblue"}>GAMES</Heading>
					<Box mt={{base: 2, md: 5}} mx={2} flex="1" height="2px" bgColor="steelblue" />
				</Flex>
				<Flex direction={"column"} gap={"30px"}>
					<Heading size={{base: "xxs", md: "sm"}} color={"transparent"}>COLUMNS</Heading>
					<Flex whiteSpace={"nowrap"} direction={"column"} gap={"20px"}>
						<Text>Teams</Text>
						<Text>Groups</Text>
						<Text>Match / Team</Text>
						<Text>Group Stage</Text>
						<Text>Total Matches</Text>
						<Text>Total Time</Text>
						<Text>Balls Required</Text>
						<Text>Extra Balls</Text>
					</Flex>
				</Flex>
				<Method
					name="KNOCKOUT"
					teams={formValues.teams}
					studentTeams={formValues.studentTeams}
					fees={formValues.fee}
					studentFees={formValues.studentFee}
					groups={formValues.groups}
					minGames={formValues.minGames}
					ballCost={formValues.ballCost}
					trophyCost={formValues.trophyCost}
					misc={formValues.otherExpenses}
				/>
				<Method
					name="ROUND ROBIN"
					teams={formValues.teams}
					studentTeams={formValues.studentTeams}
					fees={formValues.fee}
					studentFees={formValues.studentFee}
					groups={formValues.groups}
					minGames={formValues.minGames}
					ballCost={formValues.ballCost}
					trophyCost={formValues.trophyCost}
					misc={formValues.otherExpenses}
				/>
			</Flex>
			<Flex bgColor="whitesmoke" rounded={"md"} p={{base: 5, lg: 10}} shadow={"sm"} justifyContent={"space-evenly"}
				gap={"20px"} display={formValues.teams + formValues.studentTeams > 3 ? "flex" : "none"} position={"relative"}>
				<Flex position={"absolute"} top={{base: -2, md: -5}} left={5} right={0} height="2px" bgColor="transparent">
					<Heading size={{ base: "sm", md: "lg" }} color={"steelblue"}>FINANCE</Heading>
					<Box mt={{base: 2, md: 5}} mx={2} flex="1" height="2px" bgColor="steelblue" />
				</Flex>
				<Flex direction={"column"} gap={"30px"}>
					<Heading size={{base: "xxs", md: "sm"}} color={"transparent"}>COLUMNS</Heading>
					<Flex whiteSpace={"nowrap"} direction={"column"} gap={"20px"}>
						<Text>Spent On Balls</Text>
						<Text>Trophies</Text>
						<Text>Other Expenses</Text>
						<Text>Total Spent</Text>
						<Text>Total Collected</Text>
						<Text>Total Saved</Text>
					</Flex>
				</Flex>
				<Cost
					name="KNOCKOUT"
					teams={formValues.teams}
					studentTeams={formValues.studentTeams}
					fees={formValues.fee}
					studentFees={formValues.studentFee}
					groups={formValues.groups}
					minGames={formValues.minGames}
					ballCost={formValues.ballCost}
					trophyCost={formValues.trophyCost}
					misc={formValues.otherExpenses}
				/>
				<Cost
					name="ROUND ROBIN"
					teams={formValues.teams}
					studentTeams={formValues.studentTeams}
					fees={formValues.fee}
					studentFees={formValues.studentFee}
					groups={formValues.groups}
					minGames={formValues.minGames}
					ballCost={formValues.ballCost}
					trophyCost={formValues.trophyCost}
					misc={formValues.otherExpenses}
				/>
			</Flex>
			<Flex position={"absolute"} bottom={"-50px"} height={"50px"} width={"100vw"} bgColor={"steelblue"} 
				justifyContent={"space-evenly"} alignItems={"center"} color={"ghostwhite"}>
				<Heading cursor={"pointer"} size={{base: "xs", lg: "md"}} fontFamily={"monospace"} _hover={{ textDecoration: "underline" }}
					onClick={() => window.open("https://www.facebook.com/BuffaloBulldozersCricketClub/", "_blank", 'noopener,noreferrer')}>
						@2024 BUFFALO BULLDOZERS
				</Heading>
				{/* <Text>Developed by Mihir Bhansali</Text> */}
				{/* <FaFacebookF size={20} cursor={"pointer"}/> */}
			</Flex>
		</Flex>	
	);
}

export default Home;