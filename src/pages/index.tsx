import { Button, Flex, Heading, Input, Text } from "@chakra-ui/react";
import { Inter } from "next/font/google";
import { ChangeEvent, useState } from "react";
import Method from "./method";

const inter = Inter({ subsets: ["latin"] });

const Home = () => {
	const [fee, setFee] = useState <number> (0);
	const [studentFee, setStudentFee] = useState <number> (0);
	const [teams, setTeams] = useState <number> (0);
	const [studentTeams, setStudentTeams] = useState <number> (0);
	const [groups, setGroups] = useState <number> (0);
	const [minGames, setMinGames] = useState <number> (0);
	const [ballCost, setBallCost] = useState <number> (0);
	const [trophyCost, setTrophyCost] = useState <number> (0);
	const [otherExpenses, setOtherExpenses] = useState <number> (0);

	return (
		<Flex p={12} justifyContent={"space-evenly"}>
			<Flex id="form" direction={"column"} bgColor="whitesmoke" rounded={"md"} p={10}
				gap={"15px"} shadow={"sm"} justifyContent={"center"}>
				<Flex alignItems={"center"}>
					<Text width={"120px"} mx={5}>Normal Teams: </Text>
					<Input type="number" width={"150px"} value={teams} onChange={(event: ChangeEvent<HTMLInputElement>) => setTeams(Number(event.target.value))}/>
				</Flex>
				<Flex alignItems={"center"}>
					<Text width={"120px"} mx={5}>Normal Fee: </Text>
					<Input type="number" width={"150px"} value={fee} onChange={(event: ChangeEvent<HTMLInputElement>) => setFee(Number(event.target.value))}/>
				</Flex>
				<Flex alignItems={"center"}>
					<Text width={"120px"} mx={5}>Student Teams: </Text>
					<Input type="number" width={"150px"} value={studentTeams} onChange={(event: ChangeEvent<HTMLInputElement>) => setStudentTeams(Number(event.target.value))}/>
				</Flex>
				<Flex alignItems={"center"}>
					<Text width={"120px"} mx={5}>Student Fee: </Text>
					<Input type="number" width={"150px"} value={studentFee} onChange={(event: ChangeEvent<HTMLInputElement>) => setStudentFee(Number(event.target.value))}/>
				</Flex>
				<Flex alignItems={"center"}>
					<Text width={"120px"} mx={5}>Groups: </Text>
					<Input type="number" width={"150px"} value={groups} onChange={(event: ChangeEvent<HTMLInputElement>) => setGroups(Number(event.target.value))}/>
				</Flex>
				<Flex alignItems={"center"}>
					<Text width={"120px"} mx={5}>1 Ball Cost: </Text>
					<Input type="number" width={"150px"} value={ballCost} onChange={(event: ChangeEvent<HTMLInputElement>) => setBallCost(Number(event.target.value))}/>
				</Flex>
				<Flex alignItems={"center"}>
					<Text width={"120px"} mx={5}>Trophies Cost: </Text>
					<Input type="number" width={"150px"} value={trophyCost} onChange={(event: ChangeEvent<HTMLInputElement>) => setTrophyCost(Number(event.target.value))}/>
				</Flex>
				<Flex alignItems={"center"}>
					<Text width={"120px"} mx={5}>Other Expenses: </Text>
					<Input type="number" width={"150px"} value={otherExpenses} onChange={(event: ChangeEvent<HTMLInputElement>) => setOtherExpenses(Number(event.target.value))}/>
				</Flex>
				<Flex alignItems={"center"}>
					<Text width={"120px"} mx={5}>Round Robin Games: </Text>
					<Input type="number" width={"150px"} value={minGames} onChange={(event: ChangeEvent<HTMLInputElement>) => setMinGames(Number(event.target.value))}/>
				</Flex>
			</Flex>
			<Flex gap={"20px"} display={teams + studentTeams > 3 ? "flex" : "none"}>
				<Flex bgColor="whitesmoke" rounded={"md"} p={10} shadow={"sm"} direction={"column"} gap={"30px"}>
					<Heading size={"md"} color={"transparent"}>COLUMNS</Heading>
					<Flex direction={"column"} gap={"20px"} alignItems={"center"}>
						<Text>TEAMS</Text>
						<Text>GROUPS</Text>
						<Text>MIN. MATCH PER TEAM</Text>
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
					teams={teams}
					studentTeams={studentTeams}
					fees={fee}
					studentFees={studentFee}
					groups={groups}
					minGames={minGames}
					ballCost={ballCost}
					trophyCost={trophyCost}
					misc={otherExpenses}
				/>
				<Method
					name="ROUND ROBIN"
					teams={teams}
					studentTeams={studentTeams}
					fees={fee}
					studentFees={studentFee}
					groups={groups}
					minGames={minGames}
					ballCost={ballCost}
					trophyCost={trophyCost}
					misc={otherExpenses}
				/>
			</Flex>
		</Flex>	
	);
}

export default Home;