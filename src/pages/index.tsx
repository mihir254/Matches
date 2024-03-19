import { Button, Divider, Flex, Heading, Input, Text } from "@chakra-ui/react";
import { Inter } from "next/font/google";
import { ChangeEvent, useState } from "react";
import Method from "./method";

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
		<Flex p={{ base: 8, xl: 12}} gap={"40px"} wrap={"wrap"}
			justifyContent={"center"} alignItems={"center"} fontSize={{ base: "10px", sm: "15px"}}>
			<Flex id="form" direction={"column"} bgColor="whitesmoke" rounded={"md"} p={{base: 5, lg: 10}}
				gap={"15px"} shadow={"sm"} justifyContent={"center"} alignItems={"center"}>
				<Flex alignItems={"center"}>
					<Text minWidth={"120px"} mx={5}>Normal Teams</Text>
					<Input type="number" width={"120px"} name="teams" value={formValues.teams} onChange={updateInput}/>
				</Flex>
				<Flex alignItems={"center"}>
					<Text minWidth={"120px"} mx={5}>Normal Fee</Text>
					<Input type="number" width={"120px"} name="fee" value={formValues.fee} onChange={updateInput}/>
				</Flex>
				<Flex alignItems={"center"}>
					<Text minWidth={"120px"} mx={5}>Student Teams</Text>
					<Input type="number" width={"120px"} name="studentTeams" value={formValues.studentTeams} onChange={updateInput}/>
				</Flex>
				<Flex alignItems={"center"}>
					<Text minWidth={"120px"} mx={5}>Student Fee</Text>
					<Input type="number" width={"120px"} name="studentFee" value={formValues.studentFee} onChange={updateInput}/>
				</Flex>
				<Flex alignItems={"center"}>
					<Text minWidth={"120px"} mx={5}>Groups</Text>
					<Input type="number" width={"120px"} name="groups" value={formValues.groups} onChange={updateInput}/>
				</Flex>
				<Flex alignItems={"center"}>
					<Text minWidth={"120px"} mx={5}>1 Ball Cost</Text>
					<Input type="number" width={"120px"} name="ballCost" value={formValues.ballCost} onChange={updateInput}/>
				</Flex>
				<Flex alignItems={"center"}>
					<Text minWidth={"120px"} mx={5}>Trophies Cost</Text>
					<Input type="number" width={"120px"} name="trophyCost" value={formValues.trophyCost} onChange={updateInput}/>
				</Flex>
				<Flex alignItems={"center"}>
					<Text minWidth={"120px"} mx={5}>Other Expenses</Text>
					<Input type="number" width={"120px"} name="otherExpenses" value={formValues.otherExpenses} onChange={updateInput}/>
				</Flex>
				<Flex alignItems={"center"}>
					<Text minWidth={"120px"} mx={5}>Change RR Games</Text>
					<Input type="number" width={"120px"} name="minGames" value={formValues.minGames} onChange={updateInput}/>
				</Flex>
			</Flex>
			<Flex bgColor="whitesmoke" rounded={"md"} p={{base: 5, lg: 10}} shadow={"sm"} justifyContent={"space-evenly"}
				gap={"20px"} display={formValues.teams + formValues.studentTeams > 3 ? "flex" : "none"}>
				<Flex direction={"column"} gap={"30px"}>
					<Heading size={{base: "xxs", md: "md"}} color={"transparent"}>COLUMNS</Heading>
					<Flex whiteSpace={"nowrap"} direction={"column"} gap={"20px"}>
						<Text>TEAMS</Text>
						<Text>GROUPS</Text>
						<Text>MATCH / TEAM</Text>
						<Text>GROUP STAGE MATCHES</Text>
						<Text>TOTAL MATCHES</Text>
						<Text>TOTAL TIME</Text>
						<Text>BALLS REQUIRED</Text>
						<Text>EXTRA BALLS</Text>
						<Text>PRICE PER BALL</Text>
						<Text>TOTAL COST OF BALLS</Text>
						<Text>COST FOR TROPHIES</Text>
						<Text>OTHER EXPENSES</Text>
						<Text>TOTAL SPENT</Text>
						<Text>TOTAL COLLECTION</Text>
						<Text>AMOUNT SAVED</Text>
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
		</Flex>	
	);
}

export default Home;