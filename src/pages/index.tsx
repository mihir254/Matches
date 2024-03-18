import { Button, Flex, Heading, Input, Text } from "@chakra-ui/react";
import { Inter } from "next/font/google";
import { ChangeEvent, useState } from "react";

const inter = Inter({ subsets: ["latin"] });

const Home = () => {
	const [teams, setTeams] = useState <number> (0);
	const [groups, setGroups] = useState <number> (0);
	const [minGames, setMinGames] = useState <number> (0);
	const [totalGames, setTotalGames] = useState <number> (0);

	const knockout = () => {
		let matches: number = 0;
		let stages: number = 0;
		let participatingTeams = teams;
		while (participatingTeams > 1) {
			if (participatingTeams % 2 === 1) {
				participatingTeams -= 1;
			}
			stages += 1;
			matches += Math.floor(participatingTeams / 2);
			participatingTeams /= 2;
		}
		setTotalGames(matches);
	}

	const roundRobin = () => {
		const extraTeams: number = teams % groups;
		const teamsPerGroup: number = Math.floor(teams / groups);
		const groupStageGames: number = (teamsPerGroup * (teamsPerGroup - 1) / 2) * groups;
		const extraGames: number = extraTeams * teamsPerGroup;
		const totalGroupStage: number = groupStageGames + extraGames;
		const semiFinal: number = 2, final: number = 1;
		setTotalGames(totalGroupStage + semiFinal + final);
	}

	const advancedRoundRobin = () => {
		const extraTeams: number = teams % groups;
		const teamsPerGroup: number = Math.floor(teams / groups);
		let matches: number = 0;
		for (let i: number = 0; i < extraTeams; i++) {
			const totalTeams: number = teamsPerGroup + 1;
			matches += Math.floor((totalTeams * minGames) / 2);
		}
		for (let i: number = 0; i < (groups - extraTeams); i++) {
			matches += Math.floor((teamsPerGroup * minGames) / 2);
		}
		const semiFinal: number = 2, final: number = 1;
		setTotalGames(matches + semiFinal + final);
	}

	return (
		<Flex direction={"column"} minH={"100vh"} justifyContent={"center"} alignItems={"center"}>
			<Heading>How many matches will you play?</Heading>
			<Heading>Total Teams : { teams }</Heading>
			<Heading>Total Groups : { groups }</Heading>
			<Heading>Games per team : { minGames }</Heading>
			<Flex my={5} alignItems={"center"}>
				<Text mx={5}>Number of teams: </Text>
				<Input width={"250px"} value={teams} onChange={(event: ChangeEvent<HTMLInputElement>) => setTeams(Number(event.target.value))}/>
			</Flex>
			<Flex my={5} alignItems={"center"}>
				<Text mx={5}>Number of groups: </Text>
				<Input width={"250px"} value={groups} onChange={(event: ChangeEvent<HTMLInputElement>) => setGroups(Number(event.target.value))}/>
			</Flex>
			<Flex my={5} alignItems={"center"}>
				<Text mx={5}>Games per team: </Text>
				<Input width={"250px"} value={minGames} onChange={(event: ChangeEvent<HTMLInputElement>) => setMinGames(Number(event.target.value))}/>
			</Flex>
			<Flex>
				<Button onClick={knockout}>
					<Text>Knockout</Text>
				</Button>
				<Button onClick={roundRobin}>
					<Text>Round Robin</Text>
				</Button>
				<Button onClick={advancedRoundRobin}>
					<Text>Advanced Round Robin</Text>
				</Button>
			</Flex>
			<Heading>Total Games : { totalGames }</Heading>
		</Flex>	
	);
}

export default Home;